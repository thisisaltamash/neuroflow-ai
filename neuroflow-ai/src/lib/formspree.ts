const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvyrorj";

type SubmissionKind = "lead" | "contact" | "booking" | "admin_login";

export async function sendToFormspree(kind: SubmissionKind, payload: Record<string, unknown>) {
  await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      submissionType: kind,
      submittedAt: new Date().toISOString(),
      ...payload
    })
  });
}
