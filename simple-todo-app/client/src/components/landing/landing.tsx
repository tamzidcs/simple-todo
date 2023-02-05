import { Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from 'react';

const axios = require('axios')
export function Landing() {
    if (1) {
      return <Navigate to="/login" />
    }
  
    return (
      <div>
        dashboard goes here
      </div>
    );
}
