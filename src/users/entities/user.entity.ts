import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const saltRounds = 10;

@Schema()
export class User extends mongoose.Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function () {
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
});

UserSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};
