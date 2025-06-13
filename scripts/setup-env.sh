#!/bin/bash

# Check if .env.local already exists
if [ -f .env.local ]; then
  echo ".env.local already exists. Do you want to overwrite it? (y/n)"
  read answer
  if [ "$answer" != "y" ]; then
    echo "Setup cancelled."
    exit 0
  fi
fi

# Copy the example file
cp .env.example .env.local

echo "Created .env.local from template."
echo "Please edit .env.local with your actual Supabase credentials."
echo "You can find these in your Supabase project settings."
echo ""
echo "For security, never commit your .env.local file to version control."
