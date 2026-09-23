import 'server-only'

const API_ROOT = 'https://api.telegram.org'

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
}

/**
 * Escapes text for Telegram's HTML parse mode.
 * @param value Untrusted user input.
 * @returns Text safe to place inside Telegram HTML.
 */
export const escapeTelegramHtml = (value: string): string =>
  value.replace(/[&<>"]/g, char => HTML_ESCAPES[char] ?? char)

/**
 * Reports whether the bot credentials are configured.
 * @returns `true` when both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set.
 */
export const isTelegramConfigured = (): boolean =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)

/**
 * Sends an HTML message to the configured Telegram chat.
 * @param html Message body in Telegram HTML; escape user input with `escapeTelegramHtml`.
 * @returns `true` when Telegram accepted the message.
 */
export const sendTelegramMessage = async (html: string): Promise<boolean> => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return false

  try {
    const response = await fetch(`${API_ROOT}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
    return response.ok
  } catch {
    return false
  }
}
