import { currencyFormat } from "@/lib/currencyFormat";

type Props = {
  income: number;
  expense: number;
  balance: number;
  bankName?: string;
  color: { bgColor: string; symbolOne: string; symbolTwo: string };
};

function BalanceCard({ balance, income, expense, bankName, color }: Props) {
  return (
    <div
      className={`relative w-full h-32 md:h-48 duration-200 ease-in-out overflow-hidden ${color.bgColor} text-white rounded-lg shadow-xl`}
    >
      {/* design */}
      <div
        className={`absolute -top-15 -right-15 size-40 rounded-full grid place-items-center ${color.symbolOne}`}
      >
        <div className={`size-20 ${color.bgColor} rounded-full`} />
      </div>

      <div
        className={`absolute -bottom-10 -left-5 size-32 rounded-full ${color.symbolTwo}`}
      />

      {/* content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div>
          <h1 className="text-xs md:text-sm font-semibold uppercase">
            {bankName}
          </h1>
          <p className="text-lg md:text-2xl font-semibold">
            ₱<span className="font-mono">{currencyFormat(balance)}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div>
              <span className="text-xs md:text-sm">Income</span>
              <p className="text-sm md:text-lg font-semibold">
                ₱<span className="font-mono">{currencyFormat(income)}</span>
              </p>
            </div>
          </div>
          <div>
            <span className="text-xs md:text-sm">Expenses</span>
            <p className="text-sm md:text-lg font-semibold">
              ₱<span className="font-mono">{currencyFormat(expense)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
