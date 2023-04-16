import React from 'react';
import './marketplace.css';

const UserFind: React.FC = () => {
  interface UserConfig {
    name?: string;
    prompt?: string;
    tokenname?: string;
    price?: number;
    image?: string
  }

  const users = [
    {
      name: 'goldfish',
      prompt: "******",
      tokenname: 'AB123',
      price: 20,
      image: "https://www.liveaquaria.com/images/categories/large/lg_39507_Fantail_Goldfish_Red.jpg"
    },
    {
      name: 'chips ahoy',
      prompt: "******",
      tokenname: 'CD123',
      price: 60,
      image: "https://ipcdn.freshop.com/resize?url=https://images.freshop.com/00016264123218/0215de1b9685f5aa0f98aa7b78a019e2_large.png&width=512&type=webp&quality=90"
    },
    {
      name: 'amits protein bars',
      prompt: "******",
      tokenname: 'EF123',
      price: 10,
      image: "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&itemId=1263673-847&recipeName=680"
    },
    {
      name: 'doritos',
      prompt: "******",
      tokenname: 'DG123',
      price: 2,
      image: "https://images.albertsons-media.com/is/image/ABS/970031792?$ng-ecom-pdp-desktop$&defaultImage=Not_Available"
    },
  ];

  const [userList, setUserList] = React.useState<
    { name: string; prompt: string; tokenname: string; price: number; image: string}[] | undefined
  >(users);
  const [text, setText] = React.useState<string>('');


  const handleOnClick = () => {
    const findUsers =
      userList && userList?.length > 0
        ? userList?.filter((u) => u?.name === text)
        : undefined;

    console.log(findUsers);

    setUserList(findUsers);
  };

  const newUsers = [];

  const buyOnClick = (call: string) => {

    var userPreference;
    if (confirm("Do you want to buy this NFT?") == true) {
      userPreference = "Bought!";
      const unboughtUsers =
      userList && userList?.length > 0
        ? userList?.filter((u) => u?.image !== call)
        : undefined;

      console.log(unboughtUsers);

      setUserList(unboughtUsers);
      newUsers.push(unboughtUsers);
    } else {
        userPreference = "Cancelled!";
    }
  };

  
  return (
    <div>
      <div className="title">
      </div>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Search User"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setUserList(users);
          }}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>


      <div className="body">
        {userList && userList?.length === 0 && (
          <div className="notFound">Bought! Your prompt was: an ordinary Bag of Doritos. Your NFT is at: https://hashscan.io/testnet/token/0.0.4154227?p=1&k=5</div>
        )}

        {userList &&
          userList?.length > 0 &&
          userList?.map((user) => {
            return (
              <div className="body__item">
                 <img src={user?.image} className="imageview" onClick={() => buyOnClick(user?.image)}></img>
                <h3>Name: {user?.name}</h3>
                <p>Prompt: {user?.prompt}</p>
                <p>Token Name: {user?.tokenname}</p>
                <p>Price: {user?.price}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserFind;