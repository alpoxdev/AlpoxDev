import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name : 'YOURFACE_STORY' })
export default class YourFaceStory extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;
	
	@Column({ type : 'int' })
	public storyId : number;
	
	@Column({ type : 'text' })
	public story : string;
}