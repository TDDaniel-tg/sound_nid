"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "./SectionTitle";
import SectionReveal from "./SectionReveal";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        eventType: "",
        comment: "",
    });

    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.phone) return;

        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", phone: "", eventType: "", comment: "" });
            } else {
                const data = await res.json();
                setErrorMsg(data.error || "Ошибка отправки");
                setStatus("error");
            }
        } catch {
            setErrorMsg("Ошибка сети");
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-24 md:py-32 px-6">
            <div className="max-w-2xl mx-auto">
                <SectionTitle text="СВЯЖИТЕСЬ С НАМИ" className="mb-16" />

                <SectionReveal>
                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-16 bg-surface border border-border rounded-2xl"
                            >
                                {/* Animated checkmark */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <motion.svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        <motion.path
                                            d="M10 20L17 27L30 13"
                                            stroke="#841010"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                        />
                                    </motion.svg>
                                </motion.div>
                                <h3 className="font-bebas text-3xl text-text tracking-wider mb-2">
                                    Заявка отправлена!
                                </h3>
                                <p className="text-silver mb-6">Мы свяжемся с вами в ближайшее время</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="text-accent hover:text-accent-hover font-semibold transition-colors"
                                >
                                    Отправить ещё
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Name */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                        required
                                        className="floating-input w-full bg-surface border border-border rounded-lg px-4 pt-6 pb-2 text-text outline-none focus:border-accent transition-colors peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="name"
                                        className="floating-label absolute left-4 top-4 text-silver transition-all pointer-events-none peer-focus:text-xs peer-focus:top-2 peer-focus:text-accent peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                                    >
                                        Ваше имя *
                                    </label>
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="phone"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({ ...form, phone: e.target.value })
                                        }
                                        required
                                        className="floating-input w-full bg-surface border border-border rounded-lg px-4 pt-6 pb-2 text-text outline-none focus:border-accent transition-colors peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="phone"
                                        className="floating-label absolute left-4 top-4 text-silver transition-all pointer-events-none peer-focus:text-xs peer-focus:top-2 peer-focus:text-accent peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                                    >
                                        Телефон или Telegram *
                                    </label>
                                </div>

                                {/* Event type */}
                                <div>
                                    <select
                                        value={form.eventType}
                                        onChange={(e) =>
                                            setForm({ ...form, eventType: e.target.value })
                                        }
                                        className="w-full bg-surface border border-border rounded-lg px-4 py-4 text-text outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="">Тип мероприятия (необязательно)</option>
                                        <option value="wedding">Свадьба</option>
                                        <option value="corporate">Корпоратив</option>
                                        <option value="concert">Концерт</option>
                                        <option value="conference">Конференция</option>
                                        <option value="birthday">День рождения</option>
                                        <option value="prom">Выпускной</option>
                                        <option value="other">Другое</option>
                                    </select>
                                </div>

                                {/* Comment */}
                                <div className="relative">
                                    <textarea
                                        id="comment"
                                        value={form.comment}
                                        onChange={(e) =>
                                            setForm({ ...form, comment: e.target.value })
                                        }
                                        rows={4}
                                        className="floating-input w-full bg-surface border border-border rounded-lg px-4 pt-6 pb-2 text-text outline-none focus:border-accent transition-colors peer resize-none"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="comment"
                                        className="floating-label absolute left-4 top-4 text-silver transition-all pointer-events-none peer-focus:text-xs peer-focus:top-2 peer-focus:text-accent peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                                    >
                                        Комментарий (необязательно)
                                    </label>
                                </div>

                                {/* Error message */}
                                {status === "error" && errorMsg && (
                                    <p className="text-red-400 text-sm">{errorMsg}</p>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="relative w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-lg font-bebas text-xl tracking-wider uppercase transition-all duration-300
                    hover:shadow-lg hover:shadow-accent/30 overflow-hidden group disabled:opacity-70 disabled:cursor-wait"
                                >
                                    <span className="relative z-10">
                                        {status === "sending" ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Отправка…
                                            </span>
                                        ) : (
                                            "Отправить заявку"
                                        )}
                                    </span>
                                    <span className="absolute inset-0 bg-accent-hover scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </button>

                                <p className="text-center text-silver text-sm">
                                    Или напишите напрямую →{" "}
                                    <a
                                        href="https://t.me/soundnid"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:text-accent-hover transition-colors"
                                    >
                                        Telegram
                                    </a>
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </SectionReveal>
            </div>
        </section>
    );
}
