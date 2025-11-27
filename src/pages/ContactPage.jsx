import { useState } from "react";
import emailjs from "emailjs-com";
import data from "../data/contact.json";

export default function ContactPage() {
  const { contactInfo, formSubjects } = data;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const validate = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Remove error as soon user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        "service_97dgqyj",
        "template_f2mbxpq",
        form,
        "5glsjZuSWuaWEIv6o"
      )
      .then(() => {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      })
      .catch(() => setStatus("error"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-primary transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT SIDE INFO */}
          <div className="bg-bg-surface p-8 rounded-2xl shadow-md border border-border">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Contact Information</h2>
            <p className="text-text-secondary mb-6">
              Get in touch and our team will respond within 24 hours.
            </p>

            <div className="space-y-4 text-text-primary">
              <div>📞 <span className="font-semibold">{contactInfo.phone}</span></div>
              <div>✉️ <span className="font-semibold">{contactInfo.email}</span></div>
              <div>📍 <span>{contactInfo.address}</span></div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="md:col-span-2 bg-bg-surface p-8 rounded-2xl shadow-md border border-border">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Send us a message</h2>

            <form onSubmit={sendEmail} className="space-y-6">

              {/* ROW 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-text-primary">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    className={`w-full mt-2 rounded-lg px-4 py-2
                      bg-bg-main text-text-primary
                      border border-border
                      focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                      transition ${errors.firstName ? "border-red-500" : ""}`}
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="font-semibold text-text-primary">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    className="w-full mt-2 rounded-lg px-4 py-2
                      bg-bg-main text-text-primary
                      border border-border
                      focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                      transition"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ROW 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-text-primary">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    className={`w-full mt-2 rounded-lg px-4 py-2
                      bg-bg-main text-text-primary
                      border border-border
                      focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                      transition ${errors.email ? "border-red-500" : ""}`}
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="font-semibold text-text-primary">
                    Phone
                  </label>
                  <input
                    name="phone"
                    className="w-full mt-2 rounded-lg px-4 py-2
                      bg-bg-main text-text-primary
                      border border-border
                      focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                      transition"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="font-semibold text-text-primary">
                  Subject *
                </label>
                <select
                  name="subject"
                  className={`w-full mt-2 rounded-lg px-4 py-2
                    bg-bg-main text-text-primary
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                    transition ${errors.subject ? "border-red-500" : ""}`}
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="">Select Subject</option>
                  {formSubjects.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="font-semibold text-text-primary">
                  Message *
                </label>
                <textarea
                  name="message"
                  className={`w-full mt-2 rounded-lg px-4 py-3 resize-none
                    bg-bg-main text-text-primary
                    border border-border
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                    transition ${errors.message ? "border-red-500" : ""}`}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  rows={8}
                />
                {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
              </div>

              {/* STATUS */}
              {status === "success" && (
                <p className="text-green-500 font-medium">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-500 font-medium">Failed to send message. Try again.</p>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full rounded-xl py-3 font-semibold text-white
                  ${loading ? "opacity-70 cursor-not-allowed" : ""}
                  bg-accent hover:bg-accent-hover
                  transition
                `}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
