import "dotenv/config";
import ccxt from "ccxt";

async function main() {
  try {
    const exchange = new ccxt.bitget({
      apiKey: process.env.BITGET_API_KEY,
      secret: process.env.BITGET_API_SECRET,
      enableRateLimit: true, //거래소의 API 호출 한도를 넘지 않도록 ccxt가 요청 사이에 지연을 자동으로 넣습니다.
      options: { defaultType: "swap" },
    });

    // const markets = await exchange.loadMarkets();
    // 마켓의 코인 정보를 가져올 때

    const symbol = "BTC/USDT:USDT";
    const ticker = await exchange.fetchTicker(symbol);

    console.log(`[bitget] 연결 성공. 심볼: ${symbol}, 가격: ${ticker.last}`);
  } catch (error) {
    console.error("[bitget] 초기화 실패:", error?.message || error);
    process.exitCode = 1;
  }
}

main();
