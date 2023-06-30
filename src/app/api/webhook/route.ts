import bot from '@/utils/bot';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const chatId = data?.message?.chat?.id;
    if (!chatId) return;
    const text = data.message.text?.trim();
    const textE = text.split(',');
    if (textE.length < 3)
      return await bot?.sendMessage(chatId, 'Vui lòng nhập đúng định dạng. "lost,entry,sl"');
    // LOST,ENTRY,SL
    const lost = isNaN(Number(textE[0])) ? 0 : Number(textE[0]);
    const entry = isNaN(Number(textE[1])) ? 0 : Number(textE[1]);
    const sl = isNaN(Number(textE[2])) ? 0 : Number(textE[2]);
    if (entry === sl)
      return await bot?.sendMessage(chatId, 'Entry và SL không nên bằng nhau. Vui lòng nhập lại.');
    const delta = Math.abs(entry - sl);
    const volume = Number(lost / delta).toFixed(4);
    await bot?.sendMessage(
      chatId,
      `Volume của giao dịch có số chịu lỗ $${lost} - Entry $${entry} - SL $${sl} là ${volume}`,
    );
    return new Response('Done!');
  } catch (error) {
    return new Response('Error !');
  }
}
