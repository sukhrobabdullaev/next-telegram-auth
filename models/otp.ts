import mongoose, { Document, Model } from "mongoose";

export interface IOtp extends Document {
  otp: string; // keep as string
  phoneNumber: string;
  telegramData: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
  };
  expiresAt: Date;
}

const OtpSchema = new mongoose.Schema<IOtp>({
  otp: { type: String, required: true }, // store OTP as string
  phoneNumber: { type: String, required: true },
  telegramData: {
    id: { type: Number, required: true },
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
  },
  expiresAt: { type: Date, required: true },
});

// TTL index (auto delete expired)
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp: Model<IOtp> =
  mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);

export default Otp;
