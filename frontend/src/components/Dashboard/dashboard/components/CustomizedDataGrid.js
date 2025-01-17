import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import { fetchEvents } from '../../../../redux/slices/eventSlice';
import { DataGrid } from '@mui/x-data-grid';

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status) {
  const colors = {
    enligne: 'success',
    présentiel: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  { field: 'nom', headerName: 'Nom', flex: 1.5, minWidth: 200 },
  {
    field: 'mode',
    headerName: 'Mode',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'participantsCount',
    headerName: 'Participants',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: 'date',
    headerName: 'Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'CreatedBy',
    headerName: 'Organisateur',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => params.value || 'Non spécifié', 
  },
];

export default function EventTable() {
  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();
  console.log("les events ",events);
  

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const rows = events.map((event) => ({
    id: event._id,
    nom: event.nom,
    mode: event.mode,
    participantsCount: event.participants.length,
    description: event.description,
    date: new Date(event.date).toLocaleDateString('fr-FR'),
    createdBy: event.createdBy?.nom || 'Non spécifié'
  }));

  return (
    <div style={{ height: 500, width: '100%' }}>
      {/* Utilisez une librairie comme DataGrid de MUI */}
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
