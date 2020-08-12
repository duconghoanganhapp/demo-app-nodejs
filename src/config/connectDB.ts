const connectDB = (db: any): void => {
    // Connect db mysql
    db.authenticate()
        .then(() => {
            console.log('Connect database mysql successfully');
        })
        .catch(err => console.log(err));
}

export default connectDB;