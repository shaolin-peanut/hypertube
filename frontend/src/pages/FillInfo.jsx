import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CustomLayout from "../components/MatchaLayout";

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [interests, setInterests] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [gender, setGender] = useState('');
  const [sexuality, setSexuality] = useState('');

  const onSubmit = async (data) => {
    const profileData = {
      ...data,
      interests: interests.join(','),
      gender,
      sexuality,
    };

    try {
      const response = await fetch('/api/fill-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      });
      
      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        setSubmitError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      setSubmitError('An error occurred. Please try again later.');
    }
  };

  const handleInterestAdd = (e) => {
    e.preventDefault();
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest('');
    }
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <CustomLayout >
      <Card className="w-[450px] mx-auto mt-auto">
        <CardHeader>
          <CardTitle>Fill Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <div className="flex space-x-2">
                {['Male', 'Female', 'Other'].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={gender === option ? "default" : "outline"}
                    onClick={() => setGender(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sexuality</Label>
              <div className="flex space-x-2">
                {['Straight', 'Gay', 'Bisexual'].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={sexuality === option ? "default" : "outline"}
                    onClick={() => setSexuality(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                {...register('biography', { required: 'Biography is required' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <div className="flex space-x-2">
                <Input
                  id="interests"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleInterestAdd(e);
                    }
                  }}
                  placeholder="Add an interest"
                />
                <Button type="button" onClick={handleInterestAdd}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeInterest(index)}
                  >
                    {interest} ×
                  </Badge>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">Save Profile</Button>
          </form>
        </CardContent>
        {(Object.keys(errors).length > 0 || submitError) && (
          <CardFooter>
            <Alert variant="destructive">
              <AlertDescription>
                {Object.values(errors)[0]?.message || submitError}
              </AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
    </CustomLayout >
  );
};

export default ProfileForm;