import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <FriendListSidebar />
      <FormSplitBill/>
    </div>
  );
}

const FriendListSidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        {initialFriends.map((el) => (
          <Friend
            imageUrl={el.image}
            name={el.name}
            balance={el.balance}
            key={el.id}
          />
        ))}
      </ul>
      <FormAddFriend />
      <Button>Add friend</Button>
    </div>
  );
};

const Friend = ({ imageUrl, name, balance }) => {
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      {balance > 0 && (
        <p className="green">
          {name} owes you R${balance}
        </p>
      )}
      {balance < 0 && (
        <p className="red">
          You owe {name} R{Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button>Select</Button>
    </li>
  );
};

const Button = ({ children }) => {
  return <button className="button">{children}</button>;
};

const FormAddFriend = () => {
  return (
    <form className="form-add-friend">
      <label for="friendName">🫂Friend Name</label>
      <input type="text" id="friendName" />

      <label for="imageUrl">🌄 Image URL</label>
      <input type="text" id="imageUrl" />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with Clark</h2>

      <label for="billValue">💰 Bill value</label>
      <input type="text" id="billValue" />

      <label for="yourExpense">🕴️ Your expense</label>
      <input type="text" id="yourExpense" />

      <label for="friendExpense">🧑‍🤝‍🧑 Clark's expense</label>
      <input type="text" id="friendExpense" disabled />

      <label for="userPaying">🤑 Who is paying the bill?</label>
      <select id="userPaying">
        <option value={'you'}>You</option>
        <option value={'clarke'}>Clark</option>
      </select>

      <Button>Split bill</Button>
    </form>
  )
}

export default App;
