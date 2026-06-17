// ============================================================================
// app.js — PRL Prep lead tracker. Renders expandable researcher cards, filters/
// sorts them, and persists the user's edits (status, priority, next action,
// notes, last-updated) in localStorage. Public site, plain data (js/data.js).
// ============================================================================

(() => {
  "use strict";

  const STATE_KEY = "prl_state_v1";
  const PRIORITIES = ["Very high", "High", "Medium-high", "Medium", "Low"];
  const PRIORITY_RANK = { "Very high": 0, "High": 1, "Medium-high": 2, "Medium": 3, "Low": 4 };
  const STRENGTH_RANK = { "Strong": 0, "Warm": 1, "Cold": 2 };
  const NOT_CONTACTED = "Cold emailed / no response yet";

  let state = loadState();
  const expanded = new Set();

  // ------------------------------------------------------------ utilities
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const val = x => (x && String(x).trim()) ? esc(x) : '<span class="unknown">unknown</span>';
  const today = () => new Date().toISOString().slice(0, 10);

  function loadState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; } catch { return {}; }
  }
  function saveState() { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
  function ov(id) { state.leads = state.leads || {}; state.leads[id] = state.leads[id] || {}; return state.leads[id]; }

  // a lead merged with the user's saved edits
  function eff(lead) {
    const o = (state.leads || {})[lead.id] || {};
    return Object.assign({}, lead, {
      status: o.status ?? lead.status,
      priority: o.priority ?? lead.priority,
      nextAction: o.nextAction ?? lead.nextAction,
      notes: o.notes ?? lead.notes,
      lastUpdated: o.lastUpdated || ""
    });
  }

  // status → css class + group predicates
  function statusClass(s) {
    return {
      "Cold emailed / no response yet": "st-cold",
      "Positive reply: scheduling call": "st-scheduling",
      "Positive reply: asked clarification": "st-clarify",
      "Meeting proposed": "st-meeting",
      "Follow-up sent": "st-followup",
      "Chat completed": "st-chat",
      "Concrete topic discussed": "st-topic",
      "Proposal received": "st-proposal",
      "Confirmed PRL / research project": "st-confirmed",
      "Unavailable / busy": "st-busy",
      "Rejected / archived": "st-rejected"
    }[s] || "st-cold";
  }
  const hasReplied = s => s !== NOT_CONTACTED;
  const meetingNeeded = s => s === "Positive reply: scheduling call" || s === "Meeting proposed";
  const clarificationNeeded = s => s === "Positive reply: asked clarification";
  const proposalPossible = s => s === "Concrete topic discussed" || s === "Proposal received";
  const confirmed = s => s === "Confirmed PRL / research project";

  function strengthFor(l) {
    if (l.leadStrength) return l.leadStrength;
    const s = l.status;
    if (meetingNeeded(s) || confirmed(s) || s === "Concrete topic discussed" || s === "Proposal received") return "Strong";
    if (hasReplied(s) && s !== "Rejected / archived" && s !== "Unavailable / busy") return "Warm";
    return "Cold";
  }

  // ------------------------------------------------------------ chrome
  function renderChrome() {
    $("#topbar-sub").textContent = META.subtitle;
    $("#footer-note").textContent =
      `Active leads from PRL_researcher_response_context.docx; wider roster from the verified contact map. Generated ${META.generatedOn}. Nothing here is invented — missing facts show as “unknown”.`;
    $("#imported-banner").textContent = META.importedNote;
    const fb = $("#framework-banner");
    fb.textContent = META.framework;
    $("#btn-framework").addEventListener("click", () => { fb.hidden = !fb.hidden; });

    $("#btn-export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ exportedOn: new Date().toISOString(), state }, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `prl-prep-backup-${today()}.json`;
      a.click(); URL.revokeObjectURL(a.href);
    });
    $("#btn-import").addEventListener("click", () => $("#import-file").click());
    $("#import-file").addEventListener("change", e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const obj = JSON.parse(r.result);
          if (!obj.state || typeof obj.state !== "object") throw 0;
          state = obj.state; saveState(); renderAll(); alert("Backup restored.");
        } catch { alert("That file doesn't look like a PRL Prep backup."); }
      };
      r.readAsText(f); e.target.value = "";
    });
  }

  // ------------------------------------------------------------ filters bar
  function renderFilters() {
    const f = state.filters || {};
    const labs = [...new Set(LEADS.map(l => l.lab))].sort();
    const areas = [...new Set(LEADS.flatMap(l => l.researchAreas || []))].sort();
    const opt = (v, sel) => `<option value="${esc(v)}" ${sel === v ? "selected" : ""}>${esc(v)}</option>`;
    const toggle = (key, label) => `<button class="toggle-btn ${f[key] ? "on" : ""}" data-toggle="${key}">${label}</button>`;

    $("#filters").innerHTML = `
      <select data-filter="status"><option value="">All statuses</option>${META.statuses.map(s => opt(s, f.status)).join("")}</select>
      <select data-filter="lab"><option value="">All labs</option>${labs.map(l => opt(l, f.lab)).join("")}</select>
      <select data-filter="area"><option value="">All research areas</option>${areas.map(a => opt(a, f.area)).join("")}</select>
      <select data-filter="priority"><option value="">All priorities</option>${PRIORITIES.map(p => opt(p, f.priority)).join("")}</select>
      <select data-filter="sort">
        ${[["pinned", "Active first, then priority"], ["priority", "By priority"], ["strength", "By lead strength"], ["status", "By status"], ["updated", "By last updated"], ["name", "By name"]]
          .map(([v, lbl]) => `<option value="${v}" ${(f.sort || "pinned") === v ? "selected" : ""}>${lbl}</option>`).join("")}
      </select>
      <input type="search" placeholder="Search name / lab / area…" data-filter="q" value="${esc(f.q || "")}">
      ${toggle("activeOnly", "★ Active only")}
      ${toggle("replied", "Has replied")}
      ${toggle("notReplied", "Not replied")}
      ${toggle("meeting", "Meeting needed")}
      ${toggle("clarify", "Clarification needed")}
      ${toggle("proposal", "Proposal possible")}
      ${toggle("confirmed", "Confirmed")}
    `;
  }

  function applyFilters(list) {
    const f = state.filters || {};
    let out = list.filter(l => {
      const e = eff(l);
      if (f.activeOnly && l.imported) return false;
      if (f.status && e.status !== f.status) return false;
      if (f.lab && l.lab !== f.lab) return false;
      if (f.area && !(l.researchAreas || []).includes(f.area)) return false;
      if (f.priority && e.priority !== f.priority) return false;
      if (f.replied && !hasReplied(e.status)) return false;
      if (f.notReplied && hasReplied(e.status)) return false;
      if (f.meeting && !meetingNeeded(e.status)) return false;
      if (f.clarify && !clarificationNeeded(e.status)) return false;
      if (f.proposal && !proposalPossible(e.status)) return false;
      if (f.confirmed && !confirmed(e.status)) return false;
      if (f.q) {
        const q = f.q.toLowerCase();
        if (!(l.name + l.lab + l.institution + (l.researchAreas || []).join(" ") + (l.title || "")).toLowerCase().includes(q)) return false;
      }
      return true;
    });
    const sort = f.sort || "pinned";
    const byPriority = (a, b) => PRIORITY_RANK[eff(a).priority] - PRIORITY_RANK[eff(b).priority];
    out.sort((a, b) => {
      if (sort === "pinned") { if (!!a.imported !== !!b.imported) return a.imported ? 1 : -1; return byPriority(a, b); }
      if (sort === "priority") return byPriority(a, b);
      if (sort === "strength") return STRENGTH_RANK[strengthFor(eff(a))] - STRENGTH_RANK[strengthFor(eff(b))];
      if (sort === "status") return META.statuses.indexOf(eff(b).status) - META.statuses.indexOf(eff(a).status);
      if (sort === "updated") return (eff(b).lastUpdated || "").localeCompare(eff(a).lastUpdated || "");
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return out;
  }

  // ------------------------------------------------------------ stats
  function renderStats() {
    const active = LEADS.filter(l => !l.imported).length;
    const replied = LEADS.filter(l => hasReplied(eff(l).status)).length;
    const needMeeting = LEADS.filter(l => meetingNeeded(eff(l).status)).length;
    const needClarify = LEADS.filter(l => clarificationNeeded(eff(l).status)).length;
    const confirmedN = LEADS.filter(l => confirmed(eff(l).status)).length;
    const stat = (label, value, cls = "") => `
      <div class="card stat ${cls}"><div class="stat-label">${label}</div><div class="stat-value">${value}</div></div>`;
    $("#stats").innerHTML =
      stat("Active conversations", active) +
      stat("Total contacts", LEADS.length) +
      stat("Have replied", replied) +
      stat("Meeting to schedule", needMeeting, needMeeting ? "urgent" : "") +
      stat("Awaiting your clarify", needClarify) +
      stat("Confirmed", confirmedN);
  }

  // ------------------------------------------------------------ cards
  function badge(text, cls) { return `<span class="badge ${cls}">${esc(text)}</span>`; }

  function card(lead) {
    const e = eff(lead);
    const open = expanded.has(lead.id);
    const strength = strengthFor(e);
    const prCls = "pr-" + PRIORITY_RANK[e.priority];
    const links = [];
    if (e.email) links.push(`<a href="mailto:${esc(e.email)}">${esc(e.email)}</a>`);
    if (e.website) links.push(`<a href="${esc(e.website)}" target="_blank" rel="noopener">lab page ↗</a>`);
    (e.links || []).forEach(l => { if (!e.website || l.url !== e.website) links.push(`<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`); });

    const block = (label, value) => `<div class="prog-block"><span class="blk-label">${label}</span>${value}</div>`;
    const convo = e.conversationSummary || e.keyReply || e.myFollowUp
      ? block("Conversation so far", val(e.conversationSummary)) +
        block("Key reply received", val(e.keyReply)) +
        block("My follow-up so far", val(e.myFollowUp))
      : `<div class="prog-block muted">No conversation yet — ${lead.imported ? "from your contact map." : "—"}</div>`;

    return `
    <div class="card lead-card ${statusClass(e.status)} ${open ? "open" : ""}" id="lead-${lead.id}">
      <div class="lead-head" data-toggle-card="${lead.id}">
        <div class="lead-head-main">
          <h4>${esc(lead.name)} ${lead.imported ? '<span class="imported-tag" title="Pre-loaded from your verified contact map — confirm the status">from contact map</span>' : ''}</h4>
          <div class="lead-sub">${esc(lead.lab)} · <span class="muted">${esc(lead.institution)}</span></div>
          <div class="lead-areas">${(lead.researchAreas || []).map(a => `<span class="chip">${esc(a)}</span>`).join("")}</div>
        </div>
        <div class="lead-head-side">
          ${badge(e.status, statusClass(e.status))}
          ${badge(e.priority, prCls)}
          ${badge(strength, "str-" + (STRENGTH_RANK[strength] ?? 2))}
          <span class="chev">${open ? "▾" : "▸"}</span>
        </div>
      </div>
      <div class="lead-oneline">${val(e.shortSummary)}</div>
      <div class="lead-next"><b>Next:</b> ${val(e.nextAction)}</div>

      <div class="lead-body" ${open ? "" : "hidden"}>
        ${block("Position / title", val(e.title))}
        ${block("Lab / institution", esc(lead.lab) + " · " + esc(lead.institution))}
        ${block("Contact", links.length ? links.join(" &nbsp;·&nbsp; ") : '<span class="unknown">unknown</span>')}
        ${lead.groupMembers ? block("Group / copied", lead.groupMembers.map(esc).join("<br>")) : ""}
        ${block("Research area (plain English)", (lead.researchAreas || []).map(esc).join(", ") || '<span class="unknown">unknown</span>')}
        ${block("Why relevant to my goals", val(e.whyRelevant))}
        ${convo}
        ${block("Proposed dates", val(e.proposedDates))}
        ${block("Meeting mode", val(e.meetingMode))}
        ${block("Risks / issues", (e.risks && e.risks.length) ? "<ul class='risk-list'>" + e.risks.map(r => `<li>${esc(r)}</li>`).join("") + "</ul>" : '<span class="unknown">none noted</span>')}
        ${e.statistics ? block("Verified context / statistics", esc(e.statistics)) : ""}

        <div class="lead-edit">
          <span class="blk-label">Update this lead (saved on your device)</span>
          <div class="edit-row">
            <label>Status
              <select data-edit="status" data-id="${lead.id}">
                ${META.statuses.map(s => `<option ${s === e.status ? "selected" : ""}>${esc(s)}</option>`).join("")}
              </select>
            </label>
            <label>Priority
              <select data-edit="priority" data-id="${lead.id}">
                ${PRIORITIES.map(p => `<option ${p === e.priority ? "selected" : ""}>${esc(p)}</option>`).join("")}
              </select>
            </label>
          </div>
          <label class="edit-full">Next action
            <input type="text" data-edit="nextAction" data-id="${lead.id}" value="${esc(e.nextAction || "")}">
          </label>
          <label class="edit-full">My notes
            <textarea data-edit="notes" data-id="${lead.id}" placeholder="Private notes…">${esc(e.notes || "")}</textarea>
          </label>
          <div class="tiny">${e.lastUpdated ? "Last updated " + esc(e.lastUpdated) : "Not edited yet"}</div>
        </div>
      </div>
    </div>`;
  }

  function renderLeads() {
    const list = applyFilters(LEADS.slice());
    $("#leads").innerHTML = list.length
      ? list.map(card).join("")
      : `<div class="card muted">No contacts match these filters.</div>`;
  }

  function renderAll() {
    renderStats(); renderFilters(); renderLeads();
  }

  // ------------------------------------------------------------ events
  function stampEdit(id) { const o = ov(id); o.lastUpdated = today(); }

  document.addEventListener("click", e => {
    const head = e.target.closest("[data-toggle-card]");
    if (head && !e.target.closest("a, select, input, textarea, button")) {
      const id = head.dataset.toggleCard;
      if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
      // re-render just this card's open state without losing scroll
      const y = window.scrollY; renderLeads(); window.scrollTo(0, y);
      return;
    }
    const tog = e.target.closest("[data-toggle]");
    if (tog) {
      state.filters = state.filters || {};
      const k = tog.dataset.toggle;
      state.filters[k] = !state.filters[k];
      if (k === "replied" && state.filters.replied) state.filters.notReplied = false;
      if (k === "notReplied" && state.filters.notReplied) state.filters.replied = false;
      saveState(); const y = window.scrollY; renderAll(); window.scrollTo(0, y);
    }
  });

  document.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.filter) {
      state.filters = state.filters || {};
      state.filters[t.dataset.filter] = t.value;
      saveState(); const y = window.scrollY; renderAll(); window.scrollTo(0, y);
    }
    if (t.dataset.edit) {
      const id = t.dataset.id, o = ov(id);
      o[t.dataset.edit] = t.value; stampEdit(id); saveState();
      // status/priority change affects badges + stats + filters → re-render, keep card open + scroll
      if (t.dataset.edit === "status" || t.dataset.edit === "priority") {
        const y = window.scrollY; renderStats(); renderLeads(); window.scrollTo(0, y);
      } else {
        const lu = t.closest(".lead-edit")?.querySelector(".tiny");
        if (lu) lu.textContent = "Last updated " + today();
      }
    }
  });

  document.addEventListener("input", e => {
    const t = e.target;
    if (t.dataset.filter === "q") {
      state.filters = state.filters || {};
      state.filters.q = t.value; saveState();
      clearTimeout(window.__q);
      window.__q = setTimeout(() => {
        const y = window.scrollY; renderLeads(); window.scrollTo(0, y);
        const s = $('input[data-filter="q"]'); if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
      }, 300);
    }
  });

  // ------------------------------------------------------------ boot
  renderChrome();
  renderAll();
})();
