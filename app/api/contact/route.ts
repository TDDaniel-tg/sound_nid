import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { name, phone, eventType, comment } = body;

    if (!name || !phone) {
        return NextResponse.json(
            { error: "Имя и телефон обязательны" },
            { status: 400 }
        );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        // Telegram not configured — log and return success
        console.log("📩 New contact form submission:", { name, phone, eventType, comment });
        return NextResponse.json({
            success: true,
            message: "Заявка принята (Telegram не настроен, данные в логах)",
        });
    }

    const eventLabels: Record<string, string> = {
        wedding: "Свадьба",
        corporate: "Корпоратив",
        concert: "Концерт",
        conference: "Конференция",
        birthday: "День рождения",
        prom: "Выпускной",
        other: "Другое",
    };

    const text = [
        "🔔 *Новая заявка с сайта Sound NID*",
        "",
        `👤 *Имя:* ${escapeMarkdown(name)}`,
        `📱 *Телефон/Telegram:* ${escapeMarkdown(phone)}`,
        eventType ? `🎪 *Тип мероприятия:* ${eventLabels[eventType] || eventType}` : "",
        comment ? `💬 *Комментарий:* ${escapeMarkdown(comment)}` : "",
    ]
        .filter(Boolean)
        .join("\n");

    try {
        const res = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "Markdown",
                }),
            }
        );

        if (!res.ok) {
            const err = await res.json();
            console.error("Telegram API error:", err);
            return NextResponse.json(
                { error: "Ошибка отправки в Telegram" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Telegram send error:", err);
        return NextResponse.json(
            { error: "Ошибка сети при отправке" },
            { status: 500 }
        );
    }
}

function escapeMarkdown(text: string): string {
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
}
