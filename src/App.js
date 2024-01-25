import "./App.css";
import { useState } from "react";

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
  const [friends, setFriends] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriendContainer() {
    setIsOpen(!isOpen);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((curr) => (curr?.id !== friend.id) ? friend : null);
    setIsOpen(false);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setIsOpen(false);
  }

  function handleSplitBill (value) {
    setFriends(friends => friends.map((friend) => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value } : friend))

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <FriendListSidebar
        friendList={friends}
        onAddFriend={handleAddFriend}
        isOpen={isOpen}
        onOpenToggle={handleAddFriendContainer}
        selectedFriend={selectedFriend}
        onSelect={handleSelectFriend}
      />
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
  );
}

const FriendListSidebar = ({
  friendList,
  onAddFriend,
  isOpen,
  onOpenToggle,
  selectedFriend,
  onSelect,
}) => {
  return (
    <div className="sidebar">
      <ul>
        {friendList.map((el) => (
          <Friend friend={el} selectedFriend={selectedFriend} onSelect={onSelect} />
        ))}
      </ul>
      {isOpen && <FormAddFriend onAddFriend={onAddFriend} />}
      <Button onClickHandler={onOpenToggle}>
        {isOpen ? "Close" : "Add friend"}
      </Button>
    </div>
  );
};

const Friend = ({ friend, selectedFriend, onSelect }) => {
  const isSelected = friend.id === selectedFriend?.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you R{friend.balance}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} R{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClickHandler={() => onSelect(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
};

const Button = ({ onClickHandler, children }) => {
  return (
    <button className="button" onClick={onClickHandler}>
      {children}
    </button>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName || !imageUrl) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name: friendName,
      image: imageUrl,
      balance: 0,
    };

    onAddFriend(newFriend);

    setFriendName("");
    setImageUrl("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label for="friendName">🫂Friend Name</label>
      <input
        type="text"
        id="friendName"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label for="imageUrl">🌄 Image URL</label>
      <input
        type="text"
        id="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState(0);
  const [userPaid, setUserPaid] = useState(0);
  const [userPaying, setUserPaying] = useState('you');

  const friendExpense = bill - userPaid;

  function handleSubmit (e) {
    e.preventDefault();

    if (!bill || !userPaid) return;
    onSplitBill(userPaying === 'you' ? friendExpense : -userPaid)
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label for="billValue">💰 Bill value</label>
      <input type="text" id="billValue" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

      <label for="yourExpense">🕴️ Your expense</label>
      <input type="text" id="yourExpense" value={userPaid} onChange={(e) => setUserPaid(Number(e.target.value) > bill ? userPaid : Number(e.target.value))}/>

      <label for="friendExpense">🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="text" id="friendExpense" value={friendExpense} disabled />

      <label for="userPaying">🤑 Who is paying the bill?</label>
      <select id="userPaying" value={userPaying} onChange={(e) => setUserPaying(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClickHandler={handleSubmit}>Split bill</Button>
    </form>
  );
};

export default App;
