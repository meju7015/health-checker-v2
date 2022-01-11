import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CheckerStatus {
  RUN = 'RUN',
  STOP = 'STOP',
}

@Entity()
export class Checker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({
    type: 'json',
  })
  allowStatus: (number | string)[];

  @Column({
    type: 'json',
  })
  disallowStatus: (number | string)[];

  @Column({
    type: 'json',
  })
  chanel: string[];

  @Column()
  isReset: boolean;

  @Column({
    type: 'enum',
    enum: CheckerStatus,
    default: CheckerStatus.RUN,
  })
  status: CheckerStatus;

  @CreateDateColumn()
  createdAt: Date;
}
