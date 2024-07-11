import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
// import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "../components/ui/alert";

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [interests, setInterests] = useState([]);
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (data) => {
    const profileData = {
      ...data,
      interests: interests.join(','), // Convert array to comma-separated string
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
        navigate('/member/dashboard');
        console.log('Profile updated successfully');
      } else {
        setSubmitError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      setSubmitError('An error occurred. Please try again later.');
    }
  };

  const handleInterestAdd = (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      setInterests([...interests, event.target.value.trim()]);
      event.target.value = '';
    }
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Fill Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => setValue('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sexuality">Sexuality</Label>
            <Select onValueChange={(value) => setValue('sexuality', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sexuality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="straight">Straight</SelectItem>
                <SelectItem value="gay">Gay</SelectItem>
                <SelectItem value="bisexual">Bisexual</SelectItem>
              </SelectContent>
            </Select>
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
            <Input
              id="interests"
              placeholder="Add interests (press Enter)"
              onKeyPress={handleInterestAdd}
            />
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
            {/* <AlertCircle className="h-4 w-4" /> */}
            <AlertDescription>
              {Object.values(errors)[0]?.message || submitError}
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfileForm;