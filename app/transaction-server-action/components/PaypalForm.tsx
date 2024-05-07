import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function PayPalForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [selectedAmount, setSelectedAmount] = useState(0);
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const handleBuy = () => {
    // Function to handle the buy action
    console.log("Buy triggered!");
  };

  const handleCardSelection = (e) => {
    // Function to handle card selection
    console.log("Card selected:", e.target.value);
    if (e.target.value === "new") {
      setShowNewCardForm(true);
    } else {
      setShowNewCardForm(false);
    }
  };

  const handleConfirm = () => {
    // Function to handle confirmation
    console.log("Confirmation received!");
  };

  const onSubmitNewCardForm = (data) => {
    console.log("New Card Form Data:", data);
    // Add logic to handle new card form submission
  };

  return (
    <form onSubmit={handleSubmit(handleBuy)} className="flex justify-center space-x-6">
      {/* Left side */}
      <div className="w-1/2">
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amountSelect">
            Choose amount:
          </label>
          <select
            id="amountSelect"
            {...register('amountSelect', { required: true })}
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="100">$1 - 100 coins</option>
            <option value="500">$5 - 500 coins</option>
            <option value="1100">$10 - 1100 coins</option>
            <option value="1700">$15 - 1700 coins</option>
          </select>
          {errors.amountSelect && <span className="text-red-500 text-xs italic">Please select an amount</span>}
        </div>
        {showNewCardForm && (
          <form onSubmit={handleSubmit(onSubmitNewCardForm)} className="mb-6">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input type="text" id="name" {...register("name")} className="border rounded-md py-2 px-3 mt-1" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">Expiration Date</label>
              <input type="text" id="expiration" {...register("expiration")} className="border rounded-md py-2 px-3 mt-1" />
            </div>
          {/* Add somthing new here */}
          </form>
        )}
      </div>
      
      {/* Right side */}
      <div className="w-1/2">
        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cardSelect">
            Choose card:
          </label>
          <select
            id="cardSelect"
            onChange={handleCardSelection}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="previous">Previous Card</option>
            <option value="new">New Card</option>
          </select>
        </div>

        {showNewCardForm && (
          <form onSubmit={handleSubmit(onSubmitNewCardForm)} className="mb-6">
            <div className="flex flex-col mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" id="cardNumber" {...register("cardNumber")} className="border rounded-md py-2 px-3 mt-1" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="ccv" className="block text-sm font-medium text-gray-700">CCV</label>
              <input type="text" id="ccv" {...register("ccv")} className="border rounded-md py-2 px-3 mt-1" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Card</button>
          </form>
        )}

        <div>
          <button
            type="submit"
            onClick={handleConfirm}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
}
