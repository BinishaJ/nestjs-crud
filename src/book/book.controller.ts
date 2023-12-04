import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.bookService.create(createBookDto);
    } catch (error) {
      throw new HttpException(
        'Error creating book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.bookService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error getting books',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.bookService.findOne(id);
    } catch (error) {
      throw new HttpException(
        'Error getting the book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.bookService.update(id, updateBookDto);
    } catch (error) {
      throw new HttpException(
        'Error updating the book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.bookService.remove(id);
    } catch (error) {
      throw new HttpException(
        'Error deleting the book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
