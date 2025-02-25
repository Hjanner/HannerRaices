import bcrypt from 'bcrypt';

const user = [
    {
        name: 'admin',
        email: 'admin@admin.com',
        confirmado: 1,
        password: bcrypt.hashSync('admin123', 10)    
    }
]

export default user;