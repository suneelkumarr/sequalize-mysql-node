module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
      // Column-2, name
      name: { type: DataTypes.STRING(100) },
  
      // Column-3, email
      email: { type: DataTypes.STRING(100) },
    
      // Column-4, default values for
      // dates => current time
      myDate: { type: DataTypes.DATE, 
              defaultValue: DataTypes.NOW },
    
       // Timestamps
       createdAt: DataTypes.DATE,
       updatedAt: DataTypes.DATE,
},
);
return User
}
