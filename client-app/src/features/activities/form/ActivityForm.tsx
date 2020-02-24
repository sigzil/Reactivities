import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input name="title" onChange={handleInputChange} value={activity.title} placeholder="Title" />
        <Form.TextArea
          name="description"
          onChange={handleInputChange}
          value={activity.description}
          rows={2}
          placeholder="Description"
        />
        <Form.Input name="category" onChange={handleInputChange} value={activity.category} placeholder="Category" />
        <Form.Input
          name="date"
          onChange={handleInputChange}
          value={activity.date}
          placeholder="Date"
          type="datetime-local"
        />
        <Form.Input name="city" onChange={handleInputChange} value={activity.city} placeholder="City" />
        <Form.Input name="venue" onChange={handleInputChange} value={activity.venue} placeholder="Venue" />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button onClick={() => setEditMode(false)} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};
