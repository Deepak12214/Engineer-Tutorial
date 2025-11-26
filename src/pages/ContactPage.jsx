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
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT SIDE INFO */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-gray-600 mb-6">
            Get in touch and our team will respond within 24 hours.
          </p>

          <div className="space-y-4 text-gray-700">
            <div>📞 <span className="font-semibold">{contactInfo.phone}</span></div>
            <div>✉️ <span className="font-semibold">{contactInfo.email}</span></div>
            <div>📍 <span>{contactInfo.address}</span></div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

          <form onSubmit={sendEmail} className="space-y-6">

            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">
                  First Name *
                </label>
                <input
                  name="firstName"
                  className={`input-box ${errors.firstName ? "input-error" : ""}`}
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>

              <div>
                <label className="font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  name="lastName"
                  className="input-box"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  className={`input-box ${errors.email ? "input-error" : ""}`}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div>
                <label className="font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  name="phone"
                  className="input-box"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* SUBJECT */}
            <div>
              <label className="font-semibold text-gray-700">
                Subject *
              </label>
              <select
                name="subject"
                className={`input-box ${errors.subject ? "input-error" : ""}`}
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
              {errors.subject && <p className="error-text">{errors.subject}</p>}
            </div>

            {/* MESSAGE */}
            <div>
              <label className="font-semibold text-gray-700">
                Message *
              </label>
              <textarea
                name="message"
                className={`input-box h-36 ${errors.message ? "input-error" : ""}`}
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            {/* STATUS */}
            {status === "success" && (
              <p className="text-green-600 font-medium">
                Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-medium">
                Failed to send message. Try again.
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
