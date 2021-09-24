module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      // Column-2, name
      name: { type: DataTypes.STRING(100) },

      email: {
       type: DataTypes.STRING,
       validate: {
         isEmail: true
       },
       unique: true
     },
     password:{
            type: DataTypes.STRING(250),
     },
     token:{ type: DataTypes.STRING},
    
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
