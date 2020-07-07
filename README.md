# TODOs

## Recuperação de senha

### RF - Requisitos Funcionais

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

### RNF - Requisitios não funcionais

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar o Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano;

### RN - Regras de Negócio

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha a nova senha ao resetar sua senha;

## Atualização do perfil

### RF - Requisitos Funcionais

- O usuário deve poder atualizar seu nome, email e senha;

### RN - Regras de Negócio

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha o usuário deve informar sua senha antiga;
- Para atualizar sua senha o usuário deve confirmar a nova senha;

## Painel do prestador

### RF - Requisitos Funcionais

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

### RNF - Requisitios não funcionais

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser envidas em tempo-real utilizando Socket.io;

### RN - Regras de Negócio

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

## Agendamento de serviços

### RF - Requisitos Funcionais

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

### RNF - Requisitios não funcionais

- A listagem de prestadores deve ser armazenada em cache;

### RN - Regras de Negócio

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, último às 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar um horário que já passou;
- O usuário não pode agendar serviços com ele próprio;
