import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserAuthGuard } from 'src/auth/guard.user';

@Controller('comment')
export class CommentController {
  constructor(private readonly _commentService: CommentService) {}

  @Post(':id')
  @UseGuards(UserAuthGuard)
  async create(@Param('id') id: string, @Req() req) {
    console.log('req body', req.body);
    const user = await this._commentService.verifyToken(req);
    // console.log('user:', user);
    return await this._commentService.create(id, req.body, user);
  }

  @Get()
  findAll() {
    return this._commentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this._commentService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this._commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  async remove(@Param('id') id: string) {
    return await this._commentService.remove(+id);
  }
}
