function UserCard({name="Abhi", Location="historyyyy", isPremium=false }) {

    return (
        <>
            <h2>{name}</h2>
            {isPremium ==true && (
                <p>
                    Vip MEMBER <br/>
                </p>
            )}
            {isPremium == false &&(
                <p>
                    Standard Member <br/>
                </p>
            )}
        </>
    );
}

export default UserCard;