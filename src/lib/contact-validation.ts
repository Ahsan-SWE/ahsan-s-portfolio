export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  service: string;
  consent: boolean;
  website: string;
};
export function validateContact(
  value: unknown,
): { data: ContactInput } | { error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { error: "Please provide a valid message." };
  const raw = value as Record<string, unknown>;
  const string = (key: string) =>
    typeof raw[key] === "string" ? raw[key].trim() : "";
  const data: ContactInput = {
    name: string("name"),
    email: string("email"),
    subject: string("subject"),
    message: string("message"),
    service: string("service"),
    consent: raw.consent === true,
    website: string("website"),
  };
  if (data.website)
    return {
      error: "Your message could not be accepted. Please contact me by email.",
    };
  if (
    data.name.length < 2 ||
    data.name.length > 100 ||
    /[\r\n\x00-\x1f]/.test(data.name)
  )
    return { error: "Please enter a name between 2 and 100 characters." };
  if (
    data.email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)
  )
    return { error: "Please enter a valid email address." };
  if (
    data.subject.length < 3 ||
    data.subject.length > 160 ||
    /[\r\n\x00-\x1f]/.test(data.subject)
  )
    return { error: "Please enter a subject between 3 and 160 characters." };
  if (
    data.message.length < 20 ||
    data.message.length > 5000 ||
    /\x00/.test(data.message)
  )
    return { error: "Please enter a message between 20 and 5,000 characters." };
  if (data.service.length > 100 || /[\r\n\x00-\x1f]/.test(data.service))
    return { error: "Please choose a valid service." };
  if (!data.consent)
    return {
      error:
        "Please agree to the use of your details to respond to this inquiry.",
    };
  return { data };
}
