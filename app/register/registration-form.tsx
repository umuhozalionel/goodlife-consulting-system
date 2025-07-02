{/* Training Program */}
              <div className="space-y-2">
                <Label htmlFor="program" className="text-emerald-800 font-medium flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Selected Training Program
                </Label>
                <Select onValueChange={setSelectedProgram} value={selectedProgram} name="program" required>
                  <SelectTrigger className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500">
                    <SelectValue placeholder="Choose your training program" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingPrograms.map((program) => (
                      <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="text-emerald-800 font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />📅 Preferred Date
                </Label>
                <Input
                  id="preferredDate"
                  type="date"
                  className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                  name="preferredDate"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-emerald-800 font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message or Additional Notes
                </Label>
                <Textarea
                  id="message"
                  placeholder="Any specific requirements, questions, or additional information..."
                  className="rounded-xl border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 min-h-[100px]"
                  rows={4}
                  name="message"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-semibold py-3 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-emerald-50 to-amber-50 border-emerald-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">📞 Need Assistance?</h3>
              <p className="text-amber-700 mb-2">For help with registration or program inquiries, reach our team at:</p>
              <div className="space-y-2">
                <p className="font-medium text-emerald-700">📧 mugishajuniorfred@gmail.com</p>
                <p className="font-medium text-emerald-700">📱 +250 788 845 062</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}