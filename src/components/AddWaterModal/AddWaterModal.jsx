import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Svg } from 'components/Icons/icons.jsx';
import { format } from 'date-fns';

export const AddWaterModal = ({ closeModal }) => 
