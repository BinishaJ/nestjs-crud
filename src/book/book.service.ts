import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Book, BookDocument } from './schema/book';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const bookExists = await this.bookModel
      .findOne({ title: createBookDto.title })
      .exec();
    if (bookExists) {
      throw new HttpException(
        'Book with the title already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const model = new this.bookModel();
    model.title = createBookDto.title;
    model.author = createBookDto.author;
    model.published = createBookDto.published;
    return model.save();
  }

  findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  checkValidId(id: string): void {
    if (!isValidObjectId(id))
      throw new NotFoundException(`Book with ID ${id} doesn't exist`);
  }

  async findOne(id: string): Promise<Book> {
    this.checkValidId(id);
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException(`Book with ID ${id} doesn't exist`);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id);
    const book = await this.bookModel.updateOne(
      { _id: id },
      { $set: updateBookDto },
    );
    return book;
  }

  async remove(id: string) {
    await this.findOne(id);
    const book = await this.bookModel.deleteOne({ _id: id });
    return book;
  }
}
