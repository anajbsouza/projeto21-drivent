export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type CEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export type CEPAddressError = {
  erro: boolean;
}

export type CEPAddressResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}