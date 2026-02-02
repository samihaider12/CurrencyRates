 
export interface ExchangeRecord {
//   id?: string;         
  userId: string;      
  name: string;
  fromCurrency: string;
  toCurrency: string;
  realAmount: string; 
  amount: string;      
  rate: number;        
  date: string;        
}

 
export const createExchangePayload = (
  uid: string,
  name: string,
  from: string,
  to: string,
  amount: string,
  rate: number,
  converted: string
): ExchangeRecord => {
  return {
    userId: uid,
    name: name,
    fromCurrency: from,
    toCurrency: to,
    realAmount: amount,
    amount: converted,
    rate: rate,
    date: new Date().toISOString(),  
  };
};