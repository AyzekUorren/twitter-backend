import { TEST_TWET } from '../testing/test.constants';
import { TwetProviders } from './twet.providers';
import { UtilsModule } from '../utils/utils.module';
import { TagModule } from '../tag/tag.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { TestingModule, Test } from '@nestjs/testing';
import { TwetService } from './twet.service';
import { TwetController } from './twet.controller';
import { forwardRef } from '@nestjs/common';
import { TwetResponseDto } from './dto/twet-response.dto';

describe('TwetController', async () => {
    jest.setTimeout(50000);
    let twetController: TwetController;
    let twetService: TwetService;
    let spy;
    const resultArray: TwetResponseDto[] = [TEST_TWET, TEST_TWET];

    beforeAll(async () => {
        const twetModule: TestingModule = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                forwardRef(() => UserModule),
                forwardRef(() => TagModule),
                forwardRef(() => UtilsModule),
            ],
            controllers: [TwetController],
            providers: [TwetService, ...TwetProviders],
            exports: [TwetService],
        }).compile();

        twetController = twetModule.get<TwetController>(TwetController);
        twetService = twetModule.get<TwetService>(TwetService);

        spy = jest.fn();
    });

    describe('TwetController', async () => {
        it('findAll', async () => {
            spy = jest
                .spyOn(twetService, 'findAll')
                .mockImplementationOnce(() => Promise.resolve(resultArray));

            expect(await twetController.findAll()).toBe(resultArray);
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith();
        });
    });
});
