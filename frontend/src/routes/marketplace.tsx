import React from 'react';
import './marketplace.css';

const UserFind: React.FC = () => {
  const users = [
    {
      name: 'goldfish',
      prompt: "yum yum nom nom",
      tokenname: 'AB123',
      price: 20.
    },
    {
      name: 'chips ahoy',
      prompt: "sweet tooth hehe",
      tokenname: 'CD123',
      price: 60.
    },
    {
      name: 'amits protein bars',
      prompt: "power boost yay",
      tokenname: 'EF123',
      price: 10.
    },
    {
      name: 'doritos',
      prompt: "i mean meh",
      tokenname: 'DG123',
      price: 2.
    },
  ];
  const [userList, setUserList] = React.useState<
    { name: string; prompt: string; tokenname: string; price: number }[] | undefined
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
          <div className="notFound">No User Found</div>
        )}

        {userList &&
          userList?.length > 0 &&
          userList?.map((user) => {
            return (
              <div className="body__item">
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