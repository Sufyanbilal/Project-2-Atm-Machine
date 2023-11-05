import inquirer from 'inquirer'
import { faker } from '@faker-js/faker';

// requirement 
// 1 users data
// 2 atm machine
// 3 atm functions

interface User {
  Id:number
  pin:number
  name:string
  accountNumber:number
  balance:number
}

const createUser = ()=>{
  let users:User []= []

  for(let i=0; i<5; i++){
    let user:User = {
      Id:i,
      pin:1000 + i,
      name:faker.person.fullName(),
      accountNumber:Math.floor(1000000000 * Math.random() * 9000000000),
      balance:1000000 * i
    }

    users.push(user)
  }

  return users
};

//adtm machine

const atmMachine = async(users:User[])=>{
  const res = await inquirer.prompt({
    type:"number",
    message: "\n~~~~~~~~~~~~~WELCOME TO THE ATM~~~~~~~~~~~~~~~~\n\nwrite pin code",
    name:"pin"
  }) 

  const user = users.find(val => val.pin == res.pin)
  if (user){
    console.log(`welcome ${user.name}`)
    atmFunc(user)
    return
  }
console.log("invalid user pin")

}
// atm function

const atmFunc = async(user:User)=>{
  const ans = await inquirer.prompt({
    type:"list",
    name:"select",
    message:"What do you want?",
    choices:["withdraw","balance","deposit","exit"]
  })
  if (ans.select == "withdraw"){
    const amount = await inquirer.prompt({
      type:"number",
      message:"Enter Your Amount",
      name:"rupee"
    })
    if(amount.rupee > user.balance){
      return console.log("Your balance is insuficient..")
    }
    if(amount.rupee > 25000){
      return console.log("Your limit only under 25000")
    }
    console.log(`withdraw amount: ${amount.rupee}`)
    console.log(`Balance: ${user.balance-amount.rupee}`)
  }
  if (ans.select == "balance"){
    console.log(`Balance: ${user.balance}`)
    return
  }
  if (ans.select == "deposit"){
    const deposit = await inquirer.prompt({
      type:"number",
      message:"deposte number amount",
      name:"rupee"
    })
    console.log(`Desposite amount: ${deposit.rupee}`)
    console.log(`Total Balance: ${user.balance + deposit.rupee}`)
  }
  if (ans.select == "exit"){
    console.log("Thanks for using ATM")
  }


  console.log(ans)
}



const users = createUser()
atmMachine(users)


