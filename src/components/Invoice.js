import React, { useEffect, useState } from "react";

const Invoice = ({
  restroName,
  numTables,
  restroId,
  rate,
  expiryDate,
  daysInMonth,
  noOrders,
  bill,
  GST,
  grandTotal,
}) => {
  return (
    <section className="">
      <div className="max-w-5xl mx-auto py-16 bg-white">
        <article className="overflow-hidden">
          <div className="bg-[white] rounded-b-md">
            <div className="p-9">
              <div className="space-y-6 text-slate-700">
                <img className="object-cover h-12" src="/favicon.png" />

                <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                  Flourishers Edge
                </p>
              </div>
            </div>
            <div className="p-9">
              <div className="flex w-full">
                <div className="grid grid-cols-4 gap-12">
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">
                      Invoice Detail:
                    </p>
                    <p>Flourishers Edge</p>
                    <p>Near 11 miles</p>
                    <p>Hausangabad road</p>
                    <p>Bhopal 462046</p>
                  </div>
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">
                      Billed To
                    </p>
                    <p className="uppercase">{restroName}</p>
                    <p>Tesla Street 007</p>
                    <p>Frisco</p>
                    <p>CA 0000</p>
                  </div>
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">
                      Invoice Number
                    </p>
                    <p>000000</p>

                    <p className="mt-2 text-sm font-normal text-slate-700">
                      Date of Issue
                    </p>
                    <p>{expiryDate}</p>
                  </div>
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">Terms</p>
                    <p>{daysInMonth} Days</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-9">
              <div className="flex flex-col mx-0 mt-8">
                <table className="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        No. of Tables
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Orders
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Rate/Order
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-slate-700 uppercase">
                          {restroName}
                        </div>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        {numTables}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        {noOrders}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                        ₹{rate}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹{bill}
                      </td>
                    </tr>

                    {/* <!-- Here you can write more products/tasks that you want to charge for--> */}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colspan="4"
                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        ₹{bill}
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="row"
                        colspan="4"
                        className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Tax
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        + ₹{GST}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colspan="4"
                        className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                        ₹{grandTotal}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex flex-col justify-end items-end py-5 space-y-2">
                <h1 className="text-gray-900 font-semibold text-sm">Clear Invoice To Resume Services</h1>
                <button className=" flex justify-center items-center bg-green-400 p-1 px-10 rounded-xl text-gray-50 hover:text-gray-900 hover:bg-green-600 transition ease-in-out duration-300">Pay Now</button>
              </div>
            </div>

            <div className="mt-48 p-9">
              <div className="border-t pt-9 border-slate-200">
                <div className="text-sm font-light text-slate-700">
                  <p>
                    Payment terms are 14 days. Please be aware that according to
                    the Late Payment of Unwrapped Debts Act 0000, freelancers
                    are entitled to claim a 00.00 late fee upon non-payment of
                    debts after this time, at which point a new invoice will be
                    submitted with the addition of this fee. If payment of the
                    revised invoice is not received within a further 14 days,
                    additional interest will be charged to the overdue account
                    and a statutory rate of 8% plus Bank of England base of
                    0.5%, totalling 8.5%. Parties cannot contract out of the
                    Act’s provisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Invoice;
