import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService } from '@/services';

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

  return res.status(httpStatus.OK).send(enrollmentWithAddress);
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  await enrollmentsService.createOrUpdateEnrollmentWithAddress({
    ...req.body,
    userId: req.userId,
  });

  return res.sendStatus(httpStatus.OK);
}

type CEP = {
  cep: string;
}


export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as CEP;
  try {
    const address = await enrollmentsService.getAddressFromCEP(cep);
    res.status(httpStatus.OK).send(address);
  } catch (error) {
    if (error.message === 'CEP') {
      return res.status(httpStatus.BAD_REQUEST).send("CEP inválido");
    } else {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Erro interno");
    }
  }
}
