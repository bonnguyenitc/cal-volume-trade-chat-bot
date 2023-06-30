import bot from '@/utils/bot';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const chatId = data?.message?.chat?.id;
    if (!chatId) return;
    const text = data.message.text?.trim();
    const textE = text.split(',');
    if (textE.length < 3)
      return await bot?.sendMessage(chatId, 'Vui lòng nhập đúng định dạng. "profit,tp,sl"');
    // PROFIT,TP,SL
    const profit = isNaN(Number(textE[0])) ? 0 : Number(textE[0]);
    const tp = isNaN(Number(textE[1])) ? 0 : Number(textE[1]);
    const sl = isNaN(Number(textE[2])) ? 0 : Number(textE[2]);
    if (tp === sl)
      return await bot?.sendMessage(chatId, 'TP và SL không nên bằng nhau. Vui lòng nhập lại.');
    const delta = Math.abs(tp - sl);
    const volume = Number(profit / delta).toFixed(4);
    await bot?.sendMessage(
      chatId,
      `Volume của giao dịch PROFIT $${profit} - TP $${tp} - SL $${sl} là ${volume}`,
    );
    return new Response('Done!');
  } catch (error) {
    return new Response('Error !');
  }
}
