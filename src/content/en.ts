export type Service = {
  id: string;
  title: string;
  body: string;
};

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  venue: string;
  tone: "pink" | "green" | "ink";
  image: string;
  alt: string;
};

export const services: Service[] = [
  { id: "events", title: "Events", body: "The night the company puts on for its people — run with one production mind." },
  { id: "exhibitions", title: "Annual nights", body: "Year-end, gatherings, the room the whole company walks into." },
  { id: "booths", title: "Team days", body: "Offsites and team days with a clear path, a working back, and room to talk." },
  { id: "conference", title: "Kickoffs", body: "Town halls, kickoffs, and internal conferences that let a programme breathe." },
  { id: "management", title: "Event management", body: "Run-of-show, vendors, and the quiet logistics employees never notice." },
  { id: "hospitality", title: "Hospitality", body: "Dinner flow, breaks, and the pause between the speeches." },
  { id: "production", title: "Production", body: "Show calling, cues, and a night that stays on time." },
  { id: "stage", title: "Stage", body: "Platforms and sightlines that serve the speaker — and the people in the room." },
  { id: "av", title: "Audio visual", body: "Sound and picture that stay clear in a hard hall." },
  { id: "led", title: "LED screens", body: "Walls of light used with intent — not as cheap wallpaper." },
  { id: "lighting", title: "Lighting", body: "Faces first, then the architecture. Colour is a decision." },
  { id: "fabrication", title: "Fabrication", body: "Built in our workshop, installed on your floor — what the drawings promised." },
  { id: "installation", title: "Installation", body: "Night load-in without drama. Morning strike without leftovers." },
  { id: "projects", title: "Project management", body: "One owner for the timeline, the budget, and the last change before doors." },
  { id: "structure", title: "Structure", body: "Truss, staging frames, and the bones the design hangs on." },
  { id: "printing", title: "Printing", body: "Graphics that survive install, heat, lighting, and a thousand phones." },
  { id: "signage", title: "Signage", body: "Wayfinding that gets people to the hall they meant to find." },
  { id: "branding", title: "Branding", body: "Your identity, applied — not reinvented for one night." },
  { id: "logistics", title: "Logistics", body: "The path from warehouse to hall, timed to the gate." },
  { id: "transport", title: "Transportation", body: "Crew, cargo, and the vehicles that keep a call time honest." },
  { id: "warehouse", title: "Warehouse", body: "Prep off-site so the hall stays a hall, not a storeroom." },
  { id: "packaging", title: "Packaging", body: "Protect the build so it arrives as designed." },
  { id: "registration", title: "Registration", body: "Badges and queues that don't become the first impression." },
  { id: "maintenance", title: "Maintenance", body: "On-site repair so a loose fitting never becomes the story." },
];

export const work: WorkItem[] = [
  { id: "w1", title: "Internal kickoff", category: "Kickoff", venue: "Hall", tone: "pink", image: "/media/work/w1.jpg", alt: "Sample: a hall ready for a company kickoff" },
  { id: "w2", title: "Town hall", category: "Internal", venue: "Auditorium", tone: "green", image: "/media/work/w2.jpg", alt: "Sample: employees in a hall" },
  { id: "w3", title: "Awards night", category: "Awards", venue: "Stage", tone: "ink", image: "/media/work/w3.jpg", alt: "Sample: stage lights at an awards night" },
  { id: "w4", title: "Team day", category: "Team day", venue: "Offsite", tone: "green", image: "/media/work/w4.jpg", alt: "Sample: an offsite day" },
  { id: "w5", title: "Company dinner", category: "Hospitality", venue: "Dining", tone: "pink", image: "/media/work/w5.jpg", alt: "Sample: a company dinner" },
  { id: "w6", title: "Internal conference", category: "Kickoff", venue: "Auditorium", tone: "ink", image: "/media/work/w6.jpg", alt: "Sample: an internal conference hall" },
  { id: "w7", title: "Programme briefing", category: "Internal", venue: "Session", tone: "green", image: "/media/work/w7.jpg", alt: "Sample: a briefing session" },
  { id: "w8", title: "Annual night", category: "Annual", venue: "Reception", tone: "pink", image: "/media/work/w8.jpg", alt: "Sample: tables at an annual night" },
];

export const featuredWorkIds = ["w3", "w2", "w8"] as const;

export type TeamMember = {
  id: string;
  role: string;
  focus: string;
  tone: "pink" | "green" | "ink";
  image: string;
  alt: string;
};

export type HistoryBeat = {
  id: string;
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const team: TeamMember[] = [
  { id: "t1", role: "Production", focus: "Run of show, cues, the company night", tone: "pink", image: "/media/team/t1.jpg", alt: "Sample portrait: production" },
  { id: "t2", role: "Design", focus: "Space, graphics, how people walk in", tone: "green", image: "/media/team/t2.jpg", alt: "Sample portrait: design" },
  { id: "t3", role: "Fabrication", focus: "Workshop to floor, as drawn", tone: "ink", image: "/media/team/t3.jpg", alt: "Sample portrait: fabrication" },
  { id: "t4", role: "Audio visual", focus: "Sound, picture, LED, light", tone: "pink", image: "/media/team/t4.jpg", alt: "Sample portrait: audio visual" },
  { id: "t5", role: "Logistics", focus: "Load-in, trucks, strike", tone: "green", image: "/media/team/t5.jpg", alt: "Sample portrait: logistics" },
  { id: "t6", role: "Accounts", focus: "The brief, the client, the clock", tone: "ink", image: "/media/team/t6.jpg", alt: "Sample portrait: accounts" },
];

export const history: HistoryBeat[] = [
  {
    id: "h1",
    index: "01",
    title: "The brief walked in first.",
    body: "An annual night, a team day, a kickoff. We sat with the people and the hall before anyone drew a wall.",
    image: "/media/history/h1.jpg",
    alt: "Sample: a briefing around a table",
  },
  {
    id: "h2",
    index: "02",
    title: "Then the workshop turned on.",
    body: "What the drawings promised got built — not as décor, as a room that has to hold the company for a night.",
    image: "/media/history/h2.jpg",
    alt: "Sample: tools on a workshop bench",
  },
  {
    id: "h3",
    index: "03",
    title: "Production sat in the same house.",
    body: "Design, fabrication, AV, and logistics stopped being handoffs. One owner. One call time.",
    image: "/media/history/h3.jpg",
    alt: "Sample: a production control room",
  },
  {
    id: "h4",
    index: "04",
    title: "The floor taught the rest.",
    body: "Night install. Doors. The last change. The crew that stays until strike is clean.",
    image: "/media/history/h4.jpg",
    alt: "Sample: a crowd under stage lights",
  },
  {
    id: "h5",
    index: "05",
    title: "Still the same job.",
    body: "Keep the event ON. From first conversation to the empty hall.",
    image: "/media/history/h5.jpg",
    alt: "Sample: an empty hall after the night",
  },
];

