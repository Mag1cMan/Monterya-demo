"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import PayPalForm from "./PaypalForm";
import { ScanForm } from "./scanForm";

export function PaymentForm() {
  return (
    <div className="w-full space-y-y5">
      <Tabs defaultValue="paypal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paypal">Credit Card</TabsTrigger>
          <TabsTrigger value="trueMoney"> Scan </TabsTrigger>
        </TabsList>
        <TabsContent value="paypal">
          {/* <SignInForm /> */}
          <PayPalForm/>
        </TabsContent>
        <TabsContent value="trueMoney">
          {/* <RegisterForm /> */}
          <ScanForm/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
