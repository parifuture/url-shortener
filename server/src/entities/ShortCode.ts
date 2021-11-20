/* istanbul ignore next */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

type RequiredFields = 'shortCode' | 'longUrl';

export type ShortCodeCreationOptions = Pick<ShortCode, RequiredFields>;

const TABLE_NAME = 'shortcode';

@Entity(TABLE_NAME)
export class ShortCode extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ length: '9' })
  shortCode!: string;

  @Column({ type: 'text' })
  longUrl!: string;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
