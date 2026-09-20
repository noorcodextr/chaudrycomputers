export type Order = {
  id: string;
  customer: string;
  email: string;
  plan: "Starter" | "Growth" | "Scale";
  amount: number;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
  date: string;
};

export const revenueSeries = [
  { month: "Jan", revenue: 42100, lastYear: 33500 },
  { month: "Feb", revenue: 44800, lastYear: 34700 },
  { month: "Mar", revenue: 47950, lastYear: 36200 },
  { month: "Apr", revenue: 46300, lastYear: 37800 },
  { month: "May", revenue: 51200, lastYear: 39100 },
  { month: "Jun", revenue: 55600, lastYear: 41000 },
  { month: "Jul", revenue: 58940, lastYear: 43200 },
  { month: "Aug", revenue: 61120, lastYear: 45600 },
  { month: "Sep", revenue: 64830, lastYear: 47300 },
];

export const planSplit = [
  { plan: "Starter", value: 320, color: "#CFE4DD" },
  { plan: "Growth", value: 540, color: "#6FA79A" },
  { plan: "Scale", value: 210, color: "#0F6B5C" },
];

export const orders: Order[] = [
  { id: "ORD-3391", customer: "Priya Raman", email: "priya@northfield.io", plan: "Growth", amount: 249, status: "Paid", date: "Sep 18, 2026" },
  { id: "ORD-3390", customer: "Marcus Webb", email: "marcus@webbstudio.com", plan: "Scale", amount: 899, status: "Paid", date: "Sep 18, 2026" },
  { id: "ORD-3389", customer: "Amara Chen", email: "amara@driftlabs.co", plan: "Starter", amount: 49, status: "Pending", date: "Sep 17, 2026" },
  { id: "ORD-3388", customer: "Tomas Alvarez", email: "tomas@fieldnote.app", plan: "Growth", amount: 249, status: "Paid", date: "Sep 17, 2026" },
  { id: "ORD-3387", customer: "Nadia Hussain", email: "nadia@lumen.ai", plan: "Scale", amount: 899, status: "Failed", date: "Sep 16, 2026" },
  { id: "ORD-3386", customer: "Owen Fitzgerald", email: "owen@basecamp-x.com", plan: "Starter", amount: 49, status: "Paid", date: "Sep 16, 2026" },
  { id: "ORD-3385", customer: "Julia Sato", email: "julia@satoworks.jp", plan: "Growth", amount: 249, status: "Refunded", date: "Sep 15, 2026" },
  { id: "ORD-3384", customer: "Dennis Okoye", email: "dennis@harborline.com", plan: "Scale", amount: 899, status: "Paid", date: "Sep 15, 2026" },
];

export const activity = [
  { id: 1, text: "Nadia Hussain's payment failed — card declined", time: "12 min ago", tone: "rose" as const },
  { id: 2, text: "Marcus Webb upgraded from Growth to Scale", time: "48 min ago", tone: "pine" as const },
  { id: 3, text: "New signup: Owen Fitzgerald (Starter)", time: "2 hr ago", tone: "ink" as const },
  { id: 4, text: "Julia Sato requested a refund on ORD-3385", time: "4 hr ago", tone: "amber" as const },
  { id: 5, text: "Weekly usage report generated for 12 accounts", time: "6 hr ago", tone: "ink" as const },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Growth" | "Scale";
  accountsSince: string;
  mrr: number;
  status: "Active" | "Trial" | "Past due" | "Cancelled";
};

export const customers: Customer[] = [
  { id: "CUS-1042", name: "Priya Raman", email: "priya@northfield.io", plan: "Growth", accountsSince: "Feb 2025", mrr: 249, status: "Active" },
  { id: "CUS-1041", name: "Marcus Webb", email: "marcus@webbstudio.com", plan: "Scale", accountsSince: "Nov 2024", mrr: 899, status: "Active" },
  { id: "CUS-1040", name: "Amara Chen", email: "amara@driftlabs.co", plan: "Starter", accountsSince: "Sep 2026", mrr: 49, status: "Trial" },
  { id: "CUS-1039", name: "Tomas Alvarez", email: "tomas@fieldnote.app", plan: "Growth", accountsSince: "Jun 2025", mrr: 249, status: "Active" },
  { id: "CUS-1038", name: "Nadia Hussain", email: "nadia@lumen.ai", plan: "Scale", accountsSince: "Jan 2025", mrr: 899, status: "Past due" },
  { id: "CUS-1037", name: "Owen Fitzgerald", email: "owen@basecamp-x.com", plan: "Starter", accountsSince: "Sep 2026", mrr: 49, status: "Active" },
  { id: "CUS-1036", name: "Julia Sato", email: "julia@satoworks.jp", plan: "Growth", accountsSince: "Mar 2025", mrr: 249, status: "Cancelled" },
  { id: "CUS-1035", name: "Dennis Okoye", email: "dennis@harborline.com", plan: "Scale", accountsSince: "Aug 2024", mrr: 899, status: "Active" },
];

export const stats = {
  mrr: { value: 64830, delta: 6.1 },
  activeAccounts: { value: 1070, delta: 3.4 },
  churn: { value: 1.8, delta: -0.4 },
  avgResponse: { value: 2.4, delta: -12.0 },
};
