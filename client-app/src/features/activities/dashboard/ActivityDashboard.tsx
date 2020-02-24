import React, { SyntheticEvent } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  editMode: boolean;
  activities: IActivity[];
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  selectActivity: (id: string) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const ActivityDashboard: React.FC<IProps> = ({
         activities,
         selectActivity,
         selectedActivity,
         editMode,
         setEditMode,
         setSelectedActivity,
         createActivity,
         editActivity,
         deleteActivity,
         submitting,
         target
       }) => {
         return (
           <Grid>
             <Grid.Column width={8}>
               <ActivityList
                 activities={activities}
                 selectActivity={selectActivity}
                 deleteActivity={deleteActivity}
                 submitting={submitting}
                 target={target}
               />
             </Grid.Column>
             <GridColumn width={6}>
               {selectedActivity && !editMode && (
                 <ActivityDetails
                   activity={selectedActivity}
                   setEditMode={setEditMode}
                   setSelectedActivity={setSelectedActivity}
                 />
               )}
               {editMode && (
                 <ActivityForm
                   key={selectedActivity?.id || 0}
                   setEditMode={setEditMode}
                   activity={selectedActivity}
                   createActivity={createActivity}
                   editActivity={editActivity}
                   submitting={submitting}
                 />
               )}
             </GridColumn>
           </Grid>
         );
       };
