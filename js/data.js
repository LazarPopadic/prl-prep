// ============================================================================
// data.js — PRL Prep lead tracker. PUBLIC (the site is unlisted, not encrypted).
// Six active leads are populated from PRL_researcher_response_context.docx.
// The wider roster comes from the verified contact map (handover §8 + CSV).
// HONESTY RULE: never invent facts. Missing/unverifiable values are "" and the
// app renders them as "unknown". `imported:true` = pre-loaded from the contact
// map (send/contact status not confirmed — confirm and edit in the app).
// ============================================================================

const META = {
  title: "PRL Prep",
  subtitle: "Research-outreach tracker — École Polytechnique / IP Paris / Paris-Saclay labs",
  generatedOn: "2026-06-17",
  framework: "Looking for an informal supervised research experience alongside Bachelor studies (NOT an official internship requiring school paperwork). Part-time, ~5–6 h/week incl. lab + individual work, Sept–Dec 2026 (Semester 5). Goal: contribute to an ongoing topic or a concrete Bachelor-level deliverable (short report, analysis, presentation, simulation notebook). Main interest: experimental/applied physics — lasers, optics, plasma, atomic physics, photonics; simulation/analysis ok if useful.",
  importedNote: "Cards tagged “from contact map” were pre-loaded from your verified outreach list — their status is a starting value (whether each was actually emailed isn't confirmed here). Edit the status as you go.",
  // Exact status vocabulary (order matters for the dropdown)
  statuses: [
    "Cold emailed / no response yet",
    "Positive reply: scheduling call",
    "Positive reply: asked clarification",
    "Meeting proposed",
    "Follow-up sent",
    "Chat completed",
    "Concrete topic discussed",
    "Proposal received",
    "Confirmed PRL / research project",
    "Unavailable / busy",
    "Rejected / archived"
  ]
};

// ---- helper to keep roster entries compact -------------------------------
function roster(o) {
  return Object.assign({
    imported: true, leadStrength: "Cold", priority: "Medium", status: "Cold emailed / no response yet",
    lastContactDate: "", responseSummary: "", conversationSummary: "", keyReply: "",
    myFollowUp: "", proposedDates: "", meetingMode: "unknown", notes: "", risks: [],
    statistics: "", website: "", links: []
  }, o);
}

const LEADS = [

  // ======================= SIX ACTIVE LEADS ===============================
  {
    id: "fuchs-yao", imported: false,
    name: "Julien Fuchs (+ Weipeng Yao)",
    title: "CNRS Research Director, LULI (Weipeng Yao copied on the thread)",
    lab: "LULI — SPRINT",
    institution: "École Polytechnique / IP Paris (CNRS)",
    email: "julien.fuchs@polytechnique.edu",
    website: "https://luli.ip-paris.fr/en/scientists/research-teams/sprint-sources-de-particules-rayonnement-intenses",
    researchAreas: ["Intense-laser plasma physics", "Laboratory astrophysics", "Laser-driven particle/radiation sources"],
    relevanceScore: 5, priority: "Very high",
    status: "Positive reply: scheduling call", leadStrength: "Strong",
    lastContactDate: "",
    shortSummary: "Replied positively, copied Weipeng Yao — said they have projects to propose and asked for my availability to chat.",
    responseSummary: "Positive; projects available to propose; wants my availability.",
    conversationSummary: "I emailed Dr. Julien Fuchs about my interest in intense-laser plasma physics and laboratory astrophysics, introduced myself as entering Semester 5 of the École Polytechnique Bachelor in Maths & Physics, and explained I'm looking for a research experience or project from September to the end of the year.",
    keyReply: "Replied positively and copied Weipeng Yao. The key content: they would have projects to propose, and I should let them know my availability to chat about it.",
    myFollowUp: "Replied that I'd be very glad to discuss possible projects with him and Mr. Yao. Clarified I'm looking for a supervised research experience alongside my Bachelor studies, not an official internship with school paperwork, and that I could contribute to an ongoing topic or produce a deliverable (report, analysis, presentation). Asked whether they'd be free for a Zoom call, suggested tomorrow, and said I'd adapt to their availability.",
    nextAction: "Wait for the scheduling reply / agree on a Zoom time.",
    proposedDates: "", meetingMode: "Zoom (likely)",
    whyRelevant: "Laser-plasma physics is the cleanest continuation of the PHY204 laser-propagation project and one of the strongest applied-physics signals on the list.",
    risks: ["Meeting time not fixed yet"],
    notes: "Strongest active lead — they already said they have projects to propose. Weipeng Yao's email is unknown (he's copied on Fuchs's thread).",
    statistics: "",
    links: [{ label: "LULI SPRINT", url: "https://luli.ip-paris.fr/en/scientists/research-teams/sprint-sources-de-particules-rayonnement-intenses" }],
    groupMembers: ["Julien Fuchs — CNRS Research Director (LULI)", "Weipeng Yao — researcher, copied on the thread (email unknown)"]
  },
  {
    id: "colombelli", imported: false,
    name: "Raffaele Colombelli",
    title: "DR (Research Director), C2N — ODIN group",
    lab: "C2N — ODIN",
    institution: "CNRS / Université Paris-Saclay",
    email: "raffaele.colombelli@c2n.upsaclay.fr",
    website: "https://odin.c2n.universite-paris-saclay.fr/en/members-odin/",
    researchAreas: ["Mid-infrared & terahertz optoelectronic devices", "Quantum cascade lasers/detectors"],
    relevanceScore: 4, priority: "Very high",
    status: "Positive reply: scheduling call", leadStrength: "Strong",
    lastContactDate: "",
    shortSummary: "Replied positively and directly proposed a quick Zoom — asked what times today/tomorrow suit.",
    responseSummary: "Positive; asked for a Zoom rapidly.",
    conversationSummary: "I emailed Dr. Raffaele Colombelli about his group's work on mid-infrared and terahertz devices, introduced myself as entering Semester 5, and explained I'm looking for a research experience or project from September to the end of the year.",
    keyReply: "Replied positively and directly suggested a quick Zoom discussion; asked whether I was free this afternoon or tomorrow and what times would be best.",
    myFollowUp: "Replied that I'd be very glad to discuss via Zoom. Clarified it's research experience alongside my Bachelor studies, not an official internship, no school paperwork for now, and described it as a supervised project with a possible deliverable (report, analysis, presentation). Asked whether tomorrow would work and said I'd adapt to his availability.",
    nextAction: "Confirm the Zoom slot / follow up if no meeting time gets fixed.",
    proposedDates: "He offered this afternoon or tomorrow (no fixed time yet).", meetingMode: "Zoom",
    whyRelevant: "Mid-IR/THz quantum-cascade laser/detector device physics — strong applied-optics / instrumentation and device-characterization signal.",
    risks: ["A concrete time still needs to be confirmed"],
    notes: "Very high priority because he explicitly asked for a Zoom rapidly.",
    statistics: "",
    links: [{ label: "C2N ODIN", url: "https://odin.c2n.universite-paris-saclay.fr/en/members-odin/" }]
  },
  {
    id: "kleider", imported: false,
    name: "Jean-Paul Kleider (+ copied colleagues)",
    title: "CNRS Research Director, IPVF / GeePs — Program 4 (Characterization, Reliability & Modeling)",
    lab: "IPVF / GeePs — Program 4",
    institution: "CNRS / CentraleSupélec",
    email: "jean-paul.kleider@centralesupelec.fr",
    website: "https://www.ipvf.fr/en/jean-paul-kleider-philip-schulz-and-daniel-ory-introducing-programme-4-characterization-modeling-reliability/",
    researchAreas: ["PV device characterization", "Reliability", "Modeling"],
    relevanceScore: 4, priority: "Medium-high",
    status: "Positive reply: asked clarification", leadStrength: "Warm",
    lastContactDate: "",
    shortSummary: "Positive but cautious; copied colleagues (Le Gall, Alvarez, Connolly) and asked what the project framework would be.",
    responseSummary: "Positive but cautious; asked about the framework; copied colleagues.",
    conversationSummary: "I emailed Dr. Jean-Paul Kleider about a possible research experience. He replied positively but cautiously, and copied several colleagues involved in characterization and modeling: Sylvain Le Gall, Jose Alvarez, and James Connolly.",
    keyReply: "Thanked me for the interest and said that if they have an opportunity they'll come back shortly. Asked what the framework of the project would be — specifically whether it would be a Master's-programme internship via a signed agreement between École Polytechnique and the lab.",
    myFollowUp: "Replied that it would not be an official internship or part of a Master's programme, so no specific paperwork is required with the school. Clarified I'm currently in the Bachelor programme and looking for an independent research experience or project alongside my studies — informal at this stage, with a scope realistic for a soon-to-be third-year Bachelor student, details to be discussed if an opportunity arises.",
    nextAction: "Wait for a reply from Kleider or the copied colleagues / follow up later if no response.",
    proposedDates: "", meetingMode: "unknown",
    whyRelevant: "Best energy/PV route: Program 4 is characterization, reliability and modeling — optics/measurement/computation, no chemistry — which fits the energy narrative cleanly.",
    risks: ["Less concrete than Fuchs/Colombelli", "Open question: whether they have a suitable informal Bachelor-level opportunity"],
    notes: "Colleagues copied: Sylvain Le Gall, Jose Alvarez, James Connolly (their emails are unknown).",
    statistics: "",
    links: [{ label: "IPVF Program 4", url: "https://www.ipvf.fr/en/jean-paul-kleider-philip-schulz-and-daniel-ory-introducing-programme-4-characterization-modeling-reliability/" }],
    groupMembers: ["Jean-Paul Kleider — CNRS Research Director (IPVF/GeePs)", "Sylvain Le Gall — copied (email unknown)", "Jose Alvarez — copied (email unknown)", "James Connolly — copied (email unknown)"]
  },
  {
    id: "flacco", imported: false,
    name: "Alessandro Flacco",
    title: "Associate Professor (ENSTA), LOA — APPLI group",
    lab: "LOA — APPLI",
    institution: "ENSTA Paris / CNRS / École Polytechnique",
    email: "alessandro.flacco@ensta.fr",
    website: "https://loa.ensta-paris.fr/research/appli-research-group/",
    researchAreas: ["Applied ultrafast / laser-plasma physics", "Laser-plasma sources"],
    relevanceScore: 5, priority: "Very high",
    status: "Meeting proposed", leadStrength: "Strong",
    lastContactDate: "",
    shortSummary: "Replied positively and proposed meeting at LOA — offered Jul 2–3, then Jul 6–10. I'm mostly off campus; asked about Zoom.",
    responseSummary: "Positive; proposed an in-person LOA meeting (July dates).",
    conversationSummary: "I emailed Professor Alessandro Flacco about possible research topics related to laser/plasma/applied physics.",
    keyReply: "Replied positively and proposed meeting at LOA to discuss possible topics. He offered July 2 and July 3 as first dates, then July 6 to July 10.",
    myFollowUp: "Replied that I'd be very glad to discuss topics. Explained I'm off campus until September (internship opportunities back home) but back on campus June 22–27. Since his proposed dates are in July, asked whether a Zoom call would be possible at a convenient time, and offered to send background, availability and topic preferences by email if Zoom isn't convenient. Included the standard informal-project framework.",
    nextAction: "Wait for whether he accepts Zoom or suggests alternative timing.",
    proposedDates: "He proposed: Jul 2–3, then Jul 6–10. My on-campus window: Jun 22–27.",
    meetingMode: "In person at LOA proposed; Zoom requested",
    whyRelevant: "LOA APPLI (kHz laser-plasma acceleration, ultrafast sources) is the cleanest bridge from the laser-propagation project into a real applied-physics lab.",
    risks: ["Logistics clash: his July dates (Jul 2–3, 6–10) vs my mostly-off-campus availability (on campus only Jun 22–27)"],
    notes: "Strong lead — he proposed a concrete meeting. The open issue is purely timing/mode.",
    statistics: "",
    links: [{ label: "LOA APPLI", url: "https://loa.ensta-paris.fr/research/appli-research-group/" }]
  },
  {
    id: "delamarre", imported: false,
    name: "Amaury Delamarre",
    title: "CNRS researcher, C2N — ODIN group",
    lab: "C2N — ODIN",
    institution: "CNRS / Université Paris-Saclay",
    email: "amaury.delamarre@c2n.upsaclay.fr",
    website: "https://odin.c2n.universite-paris-saclay.fr/en/members-odin/",
    researchAreas: ["Optoelectronic / PV device characterization", "Detectors"],
    relevanceScore: 4, priority: "High",
    status: "Positive reply: asked clarification", leadStrength: "Warm",
    lastContactDate: "",
    shortSummary: "Positive; asked about format (experimental vs simulation; continuous vs a few days/week). Said they might propose something; away at a workshop so may be slow.",
    responseSummary: "Positive; asked for project-format detail; may be slow (workshop).",
    conversationSummary: "I emailed Dr. Amaury Delamarre about a possible research experience. He replied positively but asked for more detail before determining what might be possible.",
    keyReply: "Asked what format of internship/project I'm looking for — whether experimental or mainly simulations, and whether continuous or only a few days per week. Said they might be able to propose something, and mentioned he was away at a workshop that week so might be slow to reply.",
    myFollowUp: "Replied that I'm looking for research experience alongside my Bachelor studies, not an official internship requiring school paperwork; part-time, e.g. a few hours per week depending on what's useful; gave 5–6 h/week as a reference (lab + individual work); suggested a natural format would be a fixed weekly schedule Sept–Dec; said my main goal is experimental work but I'm willing to tackle other tasks appropriate to my level.",
    nextAction: "Wait for his reply / potentially follow up after his workshop.",
    proposedDates: "", meetingMode: "unknown",
    whyRelevant: "PV / detector device characterization — energy + device-instrumentation signal, no chemistry.",
    risks: ["He's away at a workshop — may be slow to reply"],
    notes: "Promising — he explicitly said they might be able to propose something.",
    statistics: "",
    links: [{ label: "C2N ODIN", url: "https://odin.c2n.universite-paris-saclay.fr/en/members-odin/" }]
  },
  {
    id: "barbay", imported: false,
    name: "Sylvain Barbay",
    title: "DR (Research Director), C2N — ToniQ group",
    lab: "C2N — ToniQ",
    institution: "CNRS / Université Paris-Saclay",
    email: "sylvain.barbay@c2n.upsaclay.fr",
    website: "https://toniq.c2n.universite-paris-saclay.fr/en/members/",
    researchAreas: ["Micropillar lasers", "Nonlinear / neuromorphic photonics", "Photonic devices"],
    relevanceScore: 3, priority: "High",
    status: "Positive reply: asked clarification", leadStrength: "Warm",
    lastContactDate: "",
    shortSummary: "Positive; asked whether I want a ~3-month Bachelor-framework internship; offered to discuss by video call or in person.",
    responseSummary: "Positive; offered a call; asked about the framework.",
    conversationSummary: "I emailed Professor Sylvain Barbay about his group and a possible research experience.",
    keyReply: "Replied positively, thanked me, and asked whether I was looking for something like an internship in the Bachelor framework, around three months. Offered to discuss either by video call or in person.",
    myFollowUp: "Replied that I'd be very glad to discuss, preferably over Zoom since I'm currently off campus for an internship opportunity back home. Clarified it's research experience alongside my Bachelor studies, not an official internship requiring school paperwork; explained the part-time format (a few hours/week, ~5–6 h/week reference incl. lab + individual work); suggested eventually fixing a weekly schedule Sept–Dec; asked whether he'd be free for a Zoom this week.",
    nextAction: "Wait for Zoom availability / follow up if needed.",
    proposedDates: "", meetingMode: "Zoom preferred; in person possible later",
    whyRelevant: "Applied laser/photonics device physics (micropillar lasers, neuromorphic photonics) — a reasonable photonics/instrumentation signal.",
    risks: ["Framework still to clarify", "Scheduling the Zoom"],
    notes: "Strong because he explicitly offered a video or in-person discussion.",
    statistics: "",
    links: [{ label: "C2N ToniQ", url: "https://toniq.c2n.universite-paris-saclay.fr/en/members/" }]
  },

  // ======================= WIDER ROSTER (imported) ========================
  // Verified emails/roles from the contact map (handover §8). Status is a
  // starting value — confirm whether each was actually emailed.

  // ---- LOA APPLI (ENSTA/CNRS/X; @ensta.fr) — strongest target lab --------
  roster({ id: "faure", name: "Jérôme Faure", title: "Research Director CNRS — APPLI group leader", lab: "LOA — APPLI", institution: "ENSTA Paris / CNRS / X", email: "jerome.faure@ensta.fr", researchAreas: ["Laser-plasma acceleration", "Ultrafast electron/light sources"], relevanceScore: 5, priority: "High", shortSummary: "APPLI group leader; top recommender value — email him for routing to the right postdoc/engineer.", whyRelevant: "Leads the best-fit lab for the laser-propagation continuation; strongest letter potential.", links: [{ label: "LOA APPLI", url: "https://loa.ensta-paris.fr/research/appli-research-group/" }], notes: "Same group as Flacco (already an active lead)." }),
  roster({ id: "vernier", name: "Aline Vernier", title: "Research Engineer (X) — APPLI", lab: "LOA — APPLI", institution: "ENSTA Paris / CNRS / X", email: "aline.vernier@ensta.fr", researchAreas: ["Salle Noire laser", "Electron acceleration", "Diagnostics"], relevanceScore: 5, priority: "High", shortSummary: "Best working-level APPLI contact for a diagnostics/data project.", whyRelevant: "Hands-on diagnostics/alignment/data — exactly the bounded task to ask for.", links: [{ label: "LOA APPLI", url: "https://loa.ensta-paris.fr/research/appli-research-group/" }] }),
  roster({ id: "andriyash", name: "Igor Andriyash", title: "Research Engineer CNRS — APPLI", lab: "LOA — APPLI", institution: "ENSTA Paris / CNRS / X", email: "igor.andriyash@ensta.fr", researchAreas: ["Laser-plasma accelerator modeling/simulation"], relevanceScore: 5, priority: "High", shortSummary: "Modeling/simulation bridge from the computational-optics project.", whyRelevant: "Pairs the PHY204 numerics with real laser-plasma source work.", links: [{ label: "LOA APPLI", url: "https://loa.ensta-paris.fr/research/appli-research-group/" }] }),
  roster({ id: "khanna", name: "Sonali Khanna", title: "(listed postdoc, APPLI)", lab: "LOA — APPLI", institution: "ENSTA Paris", email: "", researchAreas: ["Ultrafast source / laser-plasma (unconfirmed)"], relevanceScore: 4, priority: "Low", shortSummary: "Affiliation unverified — was skipped in the drafted outreach.", whyRelevant: "Postdoc could be a day-to-day supervisor if confirmed.", risks: ["Not on the current APPLI roster in the last check — unverified", "No confirmed email"], notes: "Skipped in outreach (unverified). Verify before contacting." }),

  // ---- LOA UPX ----------------------------------------------------------
  roster({ id: "thaury", name: "Cédric Thaury", title: "UPX group leader (CRCN CNRS)", lab: "LOA — UPX", institution: "ENSTA Paris / CNRS / X", email: "cedric.thaury@ensta.fr", researchAreas: ["Laser wakefield acceleration", "Relativistic X-ray sources"], relevanceScore: 5, priority: "Medium-high", shortSummary: "Highest-upside laser-plasma route if APPLI is full.", whyRelevant: "LWFA/X-ray source diagnostics — high applied-physics signal.", links: [{ label: "LOA UPX", url: "https://loa.ensta-paris.fr/research/upx-research-group/" }] }),
  roster({ id: "corde", name: "Sébastien Corde", title: "Professor (X) — UPX", lab: "LOA — UPX", institution: "École Polytechnique", email: "sebastien.corde@ensta.fr", researchAreas: ["Plasma wakefield acceleration", "Strong-field QED"], relevanceScore: 5, priority: "Medium", shortSummary: "Strong recommender if a project lands; route via him to a PhD/postdoc.", whyRelevant: "X professor — institutionally legible letter.", links: [{ label: "LOA UPX", url: "https://loa.ensta-paris.fr/research/upx-research-group/" }] }),
  roster({ id: "gautier", name: "Julien Gautier", title: "Research Engineer (IR1, X) — UPX", lab: "LOA — UPX", institution: "École Polytechnique", email: "julien.gautier@ensta.fr", researchAreas: ["Experimental infrastructure", "Source development"], relevanceScore: 4, priority: "Medium", shortSummary: "Engineer — good for an instrumentation/diagnostics deliverable.", whyRelevant: "Practical small-project surface.", links: [{ label: "LOA UPX", url: "https://loa.ensta-paris.fr/research/upx-research-group/" }] }),
  roster({ id: "goddet", name: "Jean-Philippe Goddet", title: "Research Engineer (IR2, CNRS) — UPX", lab: "LOA — UPX", institution: "CNRS", email: "jean-philippe.goddet@ensta.fr", researchAreas: ["Source/instrumentation support"], relevanceScore: 4, priority: "Medium", shortSummary: "Calibration / data-quality / diagnostic subproject.", whyRelevant: "Instrumentation-heavy, not theory-heavy.", links: [{ label: "LOA UPX", url: "https://loa.ensta-paris.fr/research/upx-research-group/" }] }),
  roster({ id: "kononenko", name: "Olena Kononenko", title: "Research Engineer (IR2, X) — UPX", lab: "LOA — UPX", institution: "École Polytechnique", email: "olena.kononenko@ensta.fr", researchAreas: ["Laser-plasma / ultrafast source development"], relevanceScore: 4, priority: "Medium", shortSummary: "Working-level route for diagnostic pipelines / image-spectrum analysis.", whyRelevant: "Hands-on analysis tasks.", links: [{ label: "LOA UPX", url: "https://loa.ensta-paris.fr/research/upx-research-group/" }] }),
  roster({ id: "wheeler", name: "Jonathan Wheeler", title: "Researcher (IR CNRS) — UPX", lab: "LOA — UPX", institution: "CNRS", email: "jonathan.wheeler@ensta.fr", researchAreas: ["Ultrafast light/electron source development"], relevanceScore: 4, priority: "Medium", shortSummary: "UPX (corrected from APPLI in the verified map).", whyRelevant: "Can define a compact applied-physics problem.", links: [{ label: "LOA UPX", url: "https://loa.ensta-paris.fr/research/upx-research-group/" }] }),
  roster({ id: "leblanc", name: "Adrien Leblanc", title: "CNRS researcher — relativistic optics / QED", lab: "LOA", institution: "CNRS", email: "adrien.leblanc@ensta.fr", researchAreas: ["Relativistic optics", "QED with extreme light"], relevanceScore: 4, priority: "Low", shortSummary: "Senior now (2025 ERC Synergy Grant) — not working-level; not on the current UPX roster.", whyRelevant: "Prestigious, but likely too busy for a small first-contact project.", risks: ["Senior/busy (2025 ERC Synergy)", "Not on the current UPX roster — flag"], statistics: "Won a 2025 ERC Synergy Grant (NP-QED, testing QED with extreme light) — verified in the contact-map notes." }),
  roster({ id: "rovige", name: "Lucas Rovige", title: "CNRS (rejoined 2025)", lab: "LOA", institution: "CNRS", email: "", researchAreas: ["Laser-plasma / ultrafast sources"], relevanceScore: 4, priority: "Low", shortSummary: "PhD at LOA-APPLI → postdoc UCLA 2022–25 → rejoined CNRS 2025; host lab/email unconfirmed — skipped.", whyRelevant: "Close to active data if reachable.", risks: ["Not on the current UPX roster", "Email/host lab unconfirmed"], notes: "Skipped in outreach (unverified)." }),

  // ---- LOA QUANTUM ------------------------------------------------------
  roster({ id: "merdji", name: "Hamed Merdji", title: "DR (X) — co-leads QUANTUM", lab: "LOA — QUANTUM", institution: "École Polytechnique / CNRS", email: "hamed.merdji@ensta.fr", researchAreas: ["HHG-based single-photon sources", "Ultrafast spectroscopy", "Quantum imaging"], relevanceScore: 4, priority: "Medium-high", shortSummary: "Best quantum/photonics route IF framed as ultrafast optics/spectroscopy, not theory.", whyRelevant: "Applied quantum-tech via experimental ultrafast optics.", links: [{ label: "LOA QUANTUM", url: "https://loa.ensta-paris.fr/research/ultrafast-optics-for-quantum-materials/" }] }),
  roster({ id: "boschetto", name: "Davide Boschetto", title: "Professor (ENSTA) — co-leads QUANTUM", lab: "LOA — QUANTUM", institution: "ENSTA Paris", email: "davide.boschetto@ensta.fr", researchAreas: ["Femtosecond spectroscopy", "Quantum materials"], relevanceScore: 4, priority: "Medium", shortSummary: "PI route for a short pump-probe/HHG/spectroscopy data project.", whyRelevant: "Applied imaging/sensor angle, keep scope short.", links: [{ label: "LOA QUANTUM", url: "https://loa.ensta-paris.fr/research/ultrafast-optics-for-quantum-materials/" }] }),
  roster({ id: "peronne", name: "Emmanuel Péronne", title: "CNRS researcher — QUANTUM/APPLI", lab: "LOA — QUANTUM", institution: "CNRS", email: "emmanuel.peronne@ensta.fr", researchAreas: ["Ultrafast pump-probe", "Femtosecond dynamics"], relevanceScore: 4, priority: "Medium", shortSummary: "Transient optical-signal analysis (lifetimes / phase-transition markers).", whyRelevant: "Optics data + measurement, not quantum theory.", links: [{ label: "LOA QUANTUM", url: "https://loa.ensta-paris.fr/research/ultrafast-optics-for-quantum-materials/" }] }),
  roster({ id: "weis", name: "Mateusz Weis", title: "Postdoc — QUANTUM", lab: "LOA — QUANTUM", institution: "ENSTA Paris", email: "mateusz.weis@ensta.fr", researchAreas: ["Ultrafast optics", "Spectroscopy/imaging"], relevanceScore: 4, priority: "Low", shortSummary: "Working-level pump-probe / HHG data processing.", whyRelevant: "Reproducible analysis notebook deliverable.", links: [{ label: "LOA QUANTUM", url: "https://loa.ensta-paris.fr/research/ultrafast-optics-for-quantum-materials/" }] }),
  roster({ id: "kerdi", name: "Banan Kerdi", title: "(listed postdoc, QUANTUM)", lab: "LOA — QUANTUM", institution: "ENSTA Paris", email: "", researchAreas: ["Ultrafast optics (unconfirmed)"], relevanceScore: 4, priority: "Low", shortSummary: "Unverified (QUANTUM page didn't load) — skipped in outreach.", whyRelevant: "Day-to-day contact if confirmed.", risks: ["Affiliation unverified", "No confirmed email"], notes: "Skipped in outreach (unverified)." }),

  // ---- LOA F-ILM (closest to his optics project) -----------------------
  roster({ id: "houard", name: "Aurélien Houard", title: "F-ILM group leader (IR1, X)", lab: "LOA — F-ILM", institution: "École Polytechnique", email: "aurelien.houard@ensta.fr", researchAreas: ["Laser filamentation in air", "Air waveguides"], relevanceScore: 4, priority: "Medium-high", shortSummary: "Closest fit to the laser-propagation project; email verified exactly.", whyRelevant: "Nonlinear propagation — a natural bridge from PHY204.", links: [{ label: "LOA staff", url: "https://loa.ensta-paris.fr/join-us/contact-loa-staff/" }] }),
  roster({ id: "alahyane", name: "Fatima Alahyane", title: "Research Engineer (IR2) — F-ILM", lab: "LOA — F-ILM", institution: "École Polytechnique", email: "fatima.alahyane@ensta.fr", researchAreas: ["Filamentation experiments", "Instrumentation"], relevanceScore: 3.5, priority: "Low", shortSummary: "Instrumentation / data-analysis support on laser-propagation experiments.", whyRelevant: "Practical engineer contact.", links: [{ label: "LOA staff", url: "https://loa.ensta-paris.fr/join-us/contact-loa-staff/" }] }),

  // ---- IPVF (energy/PV) -------------------------------------------------
  roster({ id: "schulz", name: "Philip Schulz", title: "CNRS Research Director — IPVF", lab: "IPVF — Program 4", institution: "CNRS", email: "philip.schulz@cnrs.fr", researchAreas: ["Interfaces & hybrid materials", "Perovskite interfaces"], relevanceScore: 4, priority: "Medium", shortSummary: "Program 4 manager — keep the ask on characterization/modeling, not chemistry.", whyRelevant: "Energy hardware without overclaiming materials chemistry.", risks: ["Perovskite-interface focus — steer to characterization/modeling, avoid synthesis"], links: [{ label: "IPVF Program 4", url: "https://www.ipvf.fr/en/jean-paul-kleider-philip-schulz-and-daniel-ory-introducing-programme-4-characterization-modeling-reliability/" }] }),
  roster({ id: "ory", name: "Daniel Ory", title: "Program 4 Luminescence lead (EDF R&D)", lab: "IPVF — Program 4", institution: "EDF R&D / IPVF", email: "contact@ipvf.fr", researchAreas: ["Photoluminescence / electroluminescence", "PV aging/reliability"], relevanceScore: 4, priority: "Medium-high", shortSummary: "Best concrete PV angle (PL/EL data, aging). No personal email — route via contact@ipvf.fr naming Program 4.", whyRelevant: "Optics + measurement + device reliability, no chemistry.", risks: ["No personal email — use the IPVF inbox naming Program 4 / Luminescence"], links: [{ label: "IPVF Program 4", url: "https://www.ipvf.fr/en/jean-paul-kleider-philip-schulz-and-daniel-ory-introducing-programme-4-characterization-modeling-reliability/" }] }),

  // ---- C2N ODIN / GOSS / MiNAPHOT / ToniQ ------------------------------
  roster({ id: "collin", name: "Stéphane Collin", title: "DR CNRS — Head of C2N Photonics Dept (since Jan 2026); IPVF Prog. 3", lab: "C2N — ODIN", institution: "CNRS / Université Paris-Saclay", email: "stephane.collin@c2n.upsaclay.fr", researchAreas: ["Ultrathin GaAs cells", "PV nanostructures", "Optoelectronic devices"], relevanceScore: 4, priority: "Medium", shortSummary: "Energy-hardware + nanophotonics; frame as device/optical characterization, not synthesis.", whyRelevant: "PV device + optics.", statistics: "Became Head of the C2N Photonics Department on 1 Jan 2026 (verified in the contact-map notes).", links: [{ label: "C2N ODIN", url: "https://odin.c2n.universite-paris-saclay.fr/en/members-odin/" }] }),
  roster({ id: "cattoni", name: "Andrea Cattoni", title: "CNRS researcher — ODIN", lab: "C2N — ODIN", institution: "CNRS", email: "andrea.cattoni@c2n.upsaclay.fr", researchAreas: ["Optoelectronic / PV devices", "Nanostructures"], relevanceScore: 3.5, priority: "Low", shortSummary: "Secondary energy/PV hardware route after IPVF.", whyRelevant: "Device characterization/analysis.", links: [{ label: "C2N ODIN", url: "https://odin.c2n.universite-paris-saclay.fr/en/members-odin/" }] }),
  roster({ id: "krebs", name: "Olivier Krebs", title: "DR — GOSS group manager", lab: "C2N — GOSS", institution: "CNRS", email: "olivier.krebs@c2n.upsaclay.fr", researchAreas: ["Solid-state quantum optics", "Single-photon sources"], relevanceScore: 3.5, priority: "Low", shortSummary: "Quantum-photonics reserve; ask only for experimental data analysis.", whyRelevant: "If quantum photonics becomes the angle.", risks: ["Could be too quantum-theory-heavy"], links: [{ label: "C2N GOSS", url: "https://goss.c2n.universite-paris-saclay.fr/en/members/" }] }),
  roster({ id: "bloch", name: "Jacqueline Bloch", title: "DR (eminent) — GOSS", lab: "C2N — GOSS", institution: "CNRS", email: "jacqueline.bloch@c2n.upsaclay.fr", researchAreas: ["Quantum fluids of light", "Polaritons"], relevanceScore: 3.5, priority: "Low", shortSummary: "High reputation; reserve/referral only with a concrete experimental-data angle.", whyRelevant: "Prestige; lower practicality for a small project.", links: [{ label: "C2N GOSS", url: "https://goss.c2n.universite-paris-saclay.fr/en/members/" }] }),
  roster({ id: "senellart", name: "Pascale Senellart-Mardon", title: "DR — GOSS", lab: "C2N — GOSS", institution: "CNRS", email: "pascale.senellart-mardon@c2n.upsaclay.fr", researchAreas: ["Bright single-photon sources"], relevanceScore: 3.5, priority: "Low", shortSummary: "Quantum-tech signal; only if experimental/instrumentation-linked.", whyRelevant: "Single-photon source characterization.", links: [{ label: "C2N GOSS", url: "https://goss.c2n.universite-paris-saclay.fr/en/members/" }] }),
  roster({ id: "cassan", name: "Eric Cassan", title: "Professor — MiNAPHOT", lab: "C2N — MiNAPHOT", institution: "Université Paris-Saclay", email: "eric.cassan@universite-paris-saclay.fr", researchAreas: ["Silicon photonics", "Computational photonics"], relevanceScore: 3.5, priority: "Medium", shortSummary: "Practical computational-photonics reserve; page says he welcomes students.", whyRelevant: "Safer non-plasma computational option.", links: [{ label: "C2N MiNAPHOT", url: "https://minaphot.c2n.universite-paris-saclay.fr/en/team/" }] }),
  roster({ id: "alonso-ramos", name: "Carlos Alonso-Ramos", title: "CNRS researcher — MiNAPHOT manager", lab: "C2N — MiNAPHOT", institution: "CNRS", email: "carlos.ramos@universite-paris-saclay.fr", researchAreas: ["Silicon photonic circuits", "Sensing"], relevanceScore: 3.5, priority: "Low", shortSummary: "Integrated-photonics simulation / sensing data. Note: email is carlos.ramos@ (not 'alonso-ramos').", whyRelevant: "Applied photonics/sensing.", links: [{ label: "C2N MiNAPHOT", url: "https://minaphot.c2n.universite-paris-saclay.fr/en/team/" }] }),
  roster({ id: "braive", name: "Rémy Braive", title: "Faculty — ToniQ", lab: "C2N — ToniQ", institution: "Université Paris-Saclay", email: "remy.braive@c2n.upsaclay.fr", researchAreas: ["Optomechanics with photonic crystals"], relevanceScore: 3, priority: "Low", shortSummary: "Device/instrumentation physics with computational optics.", whyRelevant: "Photonic-crystal/optomechanics data or simulation.", links: [{ label: "C2N ToniQ", url: "https://toniq.c2n.universite-paris-saclay.fr/en/members/" }] }),
  roster({ id: "bazin", name: "Alexandre Bazin", title: "Postdoc — ToniQ", lab: "C2N — ToniQ", institution: "CNRS", email: "alexandre.bazin@c2n.upsaclay.fr", researchAreas: ["Hybrid III-V/Si nanophotonics"], relevanceScore: 3, priority: "Low", shortSummary: "Postdoc — realistic small photonics project (device characterization/simulation).", whyRelevant: "Practical reserve if C2N photonics appeals.", links: [{ label: "C2N ToniQ", url: "https://toniq.c2n.universite-paris-saclay.fr/en/members/" }] }),

  // ---- LPP (best via warm intro; @lpp.polytechnique.fr) -----------------
  roster({ id: "guaitella", name: "Olivier Guaitella", title: "Research Engineer (HDR) — Low-Temp Plasma", lab: "LPP — Low-Temperature Plasma", institution: "École Polytechnique / CNRS", email: "olivier.guaitella@lpp.polytechnique.fr", researchAreas: ["Cold plasmas", "Plasma catalysis", "Optical diagnostics"], relevanceScore: 4, priority: "Medium", shortSummary: "Strong applied-plasma diagnostics route; best via a warm intro.", whyRelevant: "Optical diagnostics/data, not plasma-chemistry modeling.", risks: ["Best reached via warm intro / LPP contact form"], links: [{ label: "LPP low-temp", url: "https://lpp.ip-paris.fr/en/research/low-temperature-plasma-team" }] }),
  roster({ id: "bourdon", name: "Anne Bourdon", title: "Senior CNRS — Low-Temp Plasma", lab: "LPP — Low-Temperature Plasma", institution: "CNRS", email: "anne.bourdon@lpp.polytechnique.fr", researchAreas: ["Low-temp plasmas", "Electric propulsion (POSEIDON)"], relevanceScore: 3.5, priority: "Low", shortSummary: "Simulation-heavy plasma option; ask for a bounded supervised modeling task.", whyRelevant: "Fits programming/math strengths if kept applied.", links: [{ label: "LPP low-temp", url: "https://lpp.ip-paris.fr/en/research/low-temperature-plasma-team" }] }),
  roster({ id: "alvarez-laguna", name: "Alejandro Alvarez-Laguna", title: "CNRS — Low-Temp Plasma (theory/sim)", lab: "LPP — Low-Temperature Plasma", institution: "CNRS", email: "alejandro.alvarez-laguna@lpp.polytechnique.fr", researchAreas: ["Low-temp plasma theory/simulation"], relevanceScore: 4, priority: "Medium", shortSummary: "Computational plasma fitting his numerics — keep it applied to experiments. (email inferred)", whyRelevant: "Reduced simulation / diagnostic-signal reproduction.", risks: ["Email inferred from the lab pattern — verify"], links: [{ label: "LPP simulation", url: "https://lpp.ip-paris.fr/en/research/cold-plasma-team/theory-simulation-and-numerical-experiments" }] }),
  roster({ id: "booth", name: "Jean-Paul Booth", title: "CNRS — plasma diagnostics", lab: "LPP — Low-Temperature Plasma", institution: "CNRS", email: "jean-paul.booth@lpp.polytechnique.fr", researchAreas: ["Advanced optical diagnostics", "Reference plasma sources"], relevanceScore: 4, priority: "Low", shortSummary: "Spectroscopy/diagnostic data treatment. (email inferred)", whyRelevant: "Diagnostics/instrumentation.", risks: ["Email inferred — verify"], links: [{ label: "LPP diagnostics", url: "https://lpp.ip-paris.fr/en/research/cold-plasma-team/advanced-optical-diagnostics" }] }),
  roster({ id: "chabert", name: "Pascal Chabert", title: "Director of LPP (+ professor, X)", lab: "LPP — Low-Temperature Plasma", institution: "École Polytechnique", email: "pascal.chabert@lpp.polytechnique.fr", researchAreas: ["Plasmas for space propulsion", "Cold-plasma technology"], relevanceScore: 4, priority: "Low", shortSummary: "Director of LPP — best via warm intro; ask to be routed to a postdoc/PhD. (email inferred)", whyRelevant: "Plasma propulsion diagnostics / model validation.", risks: ["Senior (LPP director) — likely busy", "Email inferred — verify"], links: [{ label: "LPP propulsion", url: "https://lpp.ip-paris.fr/en/research/cold-plasma-team/plasmas-space-propulsion" }] }),
  roster({ id: "morel", name: "Pierre Morel", title: "Scientific lead — Magnetic Fusion", lab: "LPP — Magnetic Fusion", institution: "École Polytechnique / CNRS", email: "pierre.morel@lpp.polytechnique.fr", researchAreas: ["Fusion turbulence/transport", "Tokamak comparison"], relevanceScore: 4, priority: "Low", shortSummary: "Fusion data-analysis / simulation-postprocessing. (email inferred)", whyRelevant: "Energy/fusion signal; risk of being theory-heavy.", risks: ["Could be too theory-heavy", "Email inferred — verify"], links: [{ label: "LPP fusion", url: "https://lpp.ip-paris.fr/recherche/equipe-plasmas-de-fusion-magnetique" }] }),
  roster({ id: "honore", name: "Cyrille Honoré", title: "Technical lead / research engineer — Magnetic Fusion", lab: "LPP — Magnetic Fusion", institution: "École Polytechnique", email: "cyrille.honore@lpp.polytechnique.fr", researchAreas: ["ToriX", "Doppler reflectometry"], relevanceScore: 4, priority: "Low", shortSummary: "Diagnostic/instrumentation support (ToriX / reflectometry). (email inferred)", whyRelevant: "Practical engineering/instrumentation bridge.", risks: ["Email inferred — verify"], links: [{ label: "LPP fusion", url: "https://lpp.ip-paris.fr/recherche/equipe-plasmas-de-fusion-magnetique" }] }),
  roster({ id: "hennequin", name: "Pascale Hennequin", title: "CNRS — Magnetic Fusion", lab: "LPP — Magnetic Fusion", institution: "CNRS", email: "pascale.hennequin@lpp.polytechnique.fr", researchAreas: ["Doppler reflectometry", "Tokamak turbulence"], relevanceScore: 4, priority: "Low", shortSummary: "Reflectometry data analysis/visualization. (email inferred; first name is Pascale, not Patrick)", whyRelevant: "Diagnostics/data signal.", risks: ["Email inferred — verify"], links: [{ label: "LPP reflectometry", url: "https://lpp.ip-paris.fr/recherche/equipe-plasmas-de-fusion-magnetique/reflectometrie-doppler-sur-les-grands-tokamaks-europeens" }] }),
  roster({ id: "pisarev", name: "Vitaliy Pisarev", title: "Research Engineer (IR) — Magnetic Fusion", lab: "LPP — Magnetic Fusion", institution: "École Polytechnique", email: "vitaliy.pisarev@lpp.polytechnique.fr", researchAreas: ["Fusion instrumentation / data acquisition"], relevanceScore: 3.5, priority: "Low", shortSummary: "Instrumentation / DAQ support in a supervised setting. (email inferred)", whyRelevant: "Practical working-level fusion contact.", risks: ["Email inferred — verify"], links: [{ label: "LPP fusion", url: "https://lpp.ip-paris.fr/recherche/equipe-plasmas-de-fusion-magnetique" }] }),

  // ---- LULI (high upside; warm intro / contact form only) --------------
  roster({ id: "grech", name: "Mickaël Grech", title: "CNRS researcher — TIPS (SMILEI/PIC)", lab: "LULI — TIPS", institution: "CNRS / École Polytechnique", email: "", researchAreas: ["Plasma theory/simulation", "SMILEI/PIC codes"], relevanceScore: 4, priority: "Low", shortSummary: "Best LULI computational route — but no public email; warm intro / contact form.", whyRelevant: "SMILEI tutorial / diagnostic-postprocessing mini-project.", risks: ["No public email — skipped in outreach"], links: [{ label: "LULI TIPS", url: "https://luli.ip-paris.fr/en/scientists/research-teams/tips-theorie-interpretation-plasma-simulations" }] }),
  roster({ id: "riconda", name: "Caterina Riconda", title: "TIPS team leader (Sorbonne professor)", lab: "LULI — TIPS", institution: "Sorbonne Université", email: "", researchAreas: ["Plasma theory", "Numerical interpretation"], relevanceScore: 4, priority: "Low", shortSummary: "Leads TIPS — no public email; warm intro only.", whyRelevant: "High science upside; more theory-heavy.", risks: ["No public email — skipped in outreach"], links: [{ label: "LULI TIPS", url: "https://luli.ip-paris.fr/en/scientists/research-teams/tips-theorie-interpretation-plasma-simulations" }] }),
  roster({ id: "marques", name: "Jean-Raphaël Marquès", title: "PhLIPPER", lab: "LULI — PhLIPPER", institution: "CNRS / École Polytechnique", email: "", researchAreas: ["Intense lasers with plasmas/particles/radiation"], relevanceScore: 4, priority: "Low", shortSummary: "No public email; warm intro only.", whyRelevant: "Diagnostics/image-spectrum processing on existing experiments.", risks: ["No public email — skipped in outreach"], links: [{ label: "LULI PhLIPPER", url: "https://luli.ip-paris.fr/en/scientists/equipes-de-recherche/phlipper-physique-des-lasers-intenses-avec-les-plasmas-les-particules-et-le-rayonnement" }] }),
  roster({ id: "audebert", name: "Patrick Audebert", title: "R&D Laser", lab: "LULI — R&D Laser", institution: "CNRS / École Polytechnique", email: "", researchAreas: ["Intense laser chains", "Diagnostics (Apollon, LULI2000)"], relevanceScore: 4, priority: "Low", shortSummary: "No public email; warm intro only. Laser-chain diagnostics/data-quality.", whyRelevant: "Engineering/instrumentation signal.", risks: ["No public email — skipped in outreach"], links: [{ label: "LULI R&D Laser", url: "https://luli.ip-paris.fr/en/scientists/research-teams/rd-laser" }] }),
  roster({ id: "papadopoulos", name: "Dimitris Papadopoulos", title: "R&D Laser", lab: "LULI — R&D Laser", institution: "CNRS / École Polytechnique", email: "", researchAreas: ["Intense laser source architectures", "Diagnostics"], relevanceScore: 4, priority: "Low", shortSummary: "No public email; warm intro only.", whyRelevant: "Source characterization / diagnostic post-processing.", risks: ["No public email — skipped in outreach"], links: [{ label: "LULI R&D Laser", url: "https://luli.ip-paris.fr/en/scientists/research-teams/rd-laser" }] }),

  // ---- LCF / Institut d'Optique (@institutoptique.fr) -------------------
  roster({ id: "georges", name: "Patrick Georges", title: "CNRS Research Director — Lasers group head", lab: "LCF — Lasers", institution: "Institut d'Optique / CNRS", email: "patrick.georges@institutoptique.fr", researchAreas: ["High-power/fs laser systems", "Apollon 10 PW front-end"], relevanceScore: 3.5, priority: "Medium", shortSummary: "Laser-engineering reserve; ask a precise applied laser-systems question.", whyRelevant: "Strong if LOA/LULI routes are crowded.", links: [{ label: "LCF Lasers", url: "https://www.lcf.institutoptique.fr/en/groupes-de-recherche/lasers" }] }),
  roster({ id: "lucas-leclin", name: "Gaëlle Lucas-Leclin", title: "Maîtresse de conférences — Lasers", lab: "LCF — Lasers", institution: "Institut d'Optique", email: "gaelle.lucas-leclin@institutoptique.fr", researchAreas: ["Coherent beam combining", "Semiconductor lasers"], relevanceScore: 3.5, priority: "Low", shortSummary: "Semiconductor-laser / beam-combination modeling/measurement mini-project.", whyRelevant: "Applied optics reserve if you prefer optics over plasma.", links: [{ label: "LCF Lasers", url: "https://www.lcf.institutoptique.fr/en/groupes-de-recherche/lasers" }] }),
  roster({ id: "greffet", name: "Jean-Jacques Greffet", title: "Professor (emeritus) — Nanophotonics", lab: "LCF — Nanophotonics", institution: "Institut d'Optique", email: "jean-jacques.greffet@institutoptique.fr", researchAreas: ["Nanophotonics", "Thermal radiation"], relevanceScore: 3, priority: "Low", shortSummary: "Reserve only; ask for referral to a postdoc with a concrete simulation idea.", whyRelevant: "Strong science; weaker practical small-project fit.", risks: ["Emeritus — route to a postdoc/PhD"], links: [{ label: "LCF nanophotonics", url: "https://www.lcf.institutoptique.fr/en/groups/nanophotonics/group-members/faculty-and-researchers" }] }),
  roster({ id: "sauvan", name: "Christophe Sauvan", title: "Researcher/faculty — Nanophotonics", lab: "LCF — Nanophotonics", institution: "Institut d'Optique / CNRS", email: "christophe.sauvan@institutoptique.fr", researchAreas: ["Nano-optics modeling", "Photonic devices"], relevanceScore: 3, priority: "Low", shortSummary: "Computational photonics reserve (simulation / data-model comparison).", whyRelevant: "If optics simulation is the preferred fallback.", risks: ["Can read as too theoretical unless tied to a device/instrument"], links: [{ label: "LCF nanophotonics", url: "https://www.lcf.institutoptique.fr/en/groups/nanophotonics/group-members/faculty-and-researchers" }] }),
  roster({ id: "vest", name: "Benjamin Vest", title: "Faculty/researcher — Nanophotonics", lab: "LCF — Nanophotonics", institution: "Institut d'Optique", email: "benjamin.vest@institutoptique.fr", researchAreas: ["Quantum / thermal nanophotonics"], relevanceScore: 3, priority: "Low", shortSummary: "Reserve photonics/quantum-optics contact (after a referral).", whyRelevant: "If LOA QUANTUM is unavailable.", links: [{ label: "LCF nanophotonics", url: "https://www.lcf.institutoptique.fr/en/groups/nanophotonics/group-members/faculty-and-researchers" }] })
];

if (typeof module !== "undefined" && module.exports) { module.exports = { META, LEADS }; }
