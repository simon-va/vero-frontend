import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

export const ICON_LIST = [
    {
        id: -2,
        component: <SettingsOutlinedIcon/>
    },
    {
        id: 1, // Events
        component: <EventOutlinedIcon/>
    },
    {
        id: 2, // Finanzen
        component: <SavingsOutlinedIcon/>
    },
    {
        id: 3, // Mitgliedschaft
        component: <Groups2OutlinedIcon/>
    },
    {
        id: 4, // Aufgaben
        component: <AssignmentOutlinedIcon/>
    },
    {
        id: 5, // Inventar
        component: <Inventory2OutlinedIcon/>
    }
];