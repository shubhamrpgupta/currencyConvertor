import { useState } from "react"
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";


function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [curr_1, setCurr_1] = useState("usd");
  const [curr_2, setCurr_2] = useState("inr");

  const currencyInfo = useCurrencyInfo(curr_1);

  const options = Object.keys(currencyInfo);


  const swap = () => {
    setCurr_1(curr_2);
    setCurr_2(curr_1);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[curr_2])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("https://images.pexels.com/photos/6266283/pexels-photo-6266283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` }}
    >
      <div className="w-full">

        <div
          className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }} >

            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                currencyOptions={options}
                onCurrencyChange={(currency) => setCurr_1(currency)}
                selectCurrency={curr_1}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setCurr_2(currency)}
                selectCurrency={curr_2}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {curr_1.toUpperCase()} to  {curr_2.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default App
