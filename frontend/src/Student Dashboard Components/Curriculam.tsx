import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, Input } from '@mui/material';
import { Edit, MoreVert, Delete, DragHandle } from '@mui/icons-material';

const sectionTitles = ['Basic Information', 'Advance Information', 'Curriculum', 'Publish Course'];

const EduTechDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('Curriculum');
  const [sections, setSections] = useState<{ name: string; lectures: { name: string }[] }[]>([{
    name: '',
    lectures: []
  }]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const addLecture = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lectures.push({ name: '' });
    setSections(newSections);
  };

  const updateLecture = (sectionIndex: number, lectureIndex: number, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].lectures[lectureIndex].name = value;
    setSections(newSections);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addSection = () => {
    setSections([...sections, { name: '', lectures: [] }]);
  };

  const handlePrevious = () => {
    const currentIndex = sectionTitles.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(sectionTitles[currentIndex - 1]);
    }
  };

  const handleSaveNext = () => {
    const isValid = sections.every(section => section.name !== '' && section.lectures.every(lecture => lecture.name !== ''));
    if (isValid) {
      const currentIndex = sectionTitles.indexOf(currentPage);
      if (currentIndex < sectionTitles.length - 1) {
        setCurrentPage(sectionTitles[currentIndex + 1]);
      }
    }
  };

  return (
    <div className="p-4">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center">
              <DragHandle className="mr-2 text-gray-500" />
              <h3 className="text-lg font-semibold">Section {sectionIndex + 1}: {section.name}</h3>
            </div>
            <div className="flex space-x-2">
              <IconButton><Edit fontSize="small" /></IconButton>
              <IconButton><Delete fontSize="small" /></IconButton>
              <IconButton><MoreVert fontSize="small" /></IconButton>
            </div>
          </div>
          {section.lectures.map((lecture, lectureIndex) => (
            <div key={lectureIndex} className="flex justify-between items-center mt-2 p-2 border rounded-lg">
              <Input
                value={lecture.name}
                onChange={(e:any) => updateLecture(sectionIndex, lectureIndex, e.target.value)}
                placeholder="Lecture name"
                className="flex-grow border-b p-1 mr-2"
              />
              <Button onClick={handleClick} className="text-red-600">Contents</Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {['Video', 'Attach File', 'Captions', 'Description', 'Lecture Notes'].map((option, idx) => (
                  <MenuItem key={idx} onClick={handleClose}>{option}</MenuItem>
                ))}
              </Menu>
            </div>
          ))}
          <Button onClick={() => addLecture(sectionIndex)} className="mt-2 bg-red-100 text-red-600 p-2 rounded">Add Lecture</Button>
        </div>
      ))}
      <Button onClick={addSection} className="bg-red-100 text-red-600 p-2 rounded">Add Section</Button>
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrevious} disabled={sectionTitles.indexOf(currentPage) === 0} className="bg-red-100 text-red-600 p-2 rounded">Previous</Button>
        <Button onClick={handleSaveNext} disabled={sectionTitles.indexOf(currentPage) === sectionTitles.length - 1} className="bg-red-100 text-red-600 p-2 rounded">Save & Next</Button>
      </div>
    </div>
  );
};

export default EduTechDashboard;
