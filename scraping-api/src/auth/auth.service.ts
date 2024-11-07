import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { AuthCredentialsDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new this.userModel({
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      throw new ConflictException('Email already exists');
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}